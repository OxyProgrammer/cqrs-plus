using Confluent.Kafka;
using CQRS.Core.Consumers;
using CQRS.Core.Events;
using Microsoft.Extensions.Options;
using Post.Query.Infrastructure.Converters;
using Post.Query.Infrastructure.Handlers;
using System.Text.Json;

namespace Post.Query.Infrastructure.Consumers
{
    public class EventConsumer : IEventConsumer
    {
        private readonly ConsumerConfig _config;
        private readonly IEventHandler _eventHandler;

        public EventConsumer(IOptions<ConsumerConfig> config, IEventHandler eventHandler)
        {
            _config = config.Value;
            _eventHandler = eventHandler;
        }

        public void Consume(string topic, CancellationToken cancellationToken)
        {
            using var consumer = new ConsumerBuilder<string, string>(_config)
                .SetKeyDeserializer(Deserializers.Utf8)
                .SetValueDeserializer(Deserializers.Utf8)
                .Build();

            consumer.Subscribe(topic);

            while (true)
            {
                var allowUnknownTopic = true;

                while (!cancellationToken.IsCancellationRequested)
                {
                    try
                    {
                        var consumeResult = consumer.Consume(cancellationToken);

                        if (consumeResult?.Message == null)
                        {
                            continue;
                        }

                        var options = new JsonSerializerOptions { Converters = { new EventJsonConverter() } };
                        var @event = JsonSerializer.Deserialize<BaseEvent>(consumeResult.Message.Value, options);
                        var handlerMethod = _eventHandler.GetType().GetMethod("On", new Type[] { @event.GetType() });

                        if (handlerMethod == null)
                        {
                            throw new ArgumentNullException(nameof(handlerMethod), "Could not find event handler method!");
                        }

                        handlerMethod.Invoke(_eventHandler, new object[] { @event });
                        consumer.Commit(consumeResult);
                    }
                    catch (Exception e)
                    {
                        // TODO This accounts for a kafka client bug where allow.auto.create.topics is true, but Consume still throws the first try
                        if ((_config.AllowAutoCreateTopics.HasValue && _config.AllowAutoCreateTopics.Value)
                            && allowUnknownTopic && !e.Message.Equals("Broker: Unknown topic or partition"))
                            throw;

                        allowUnknownTopic = false;
                    }
                }
            }
        }
    }
}
