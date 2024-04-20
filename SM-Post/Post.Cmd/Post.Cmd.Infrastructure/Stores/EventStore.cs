using CQRS.Core.Domain;
using CQRS.Core.Events;
using CQRS.Core.Infrastructure;
using CQRS.Core.Exceptions;
using Post.Cmd.Domain;
using CQRS.Core.Producers;

namespace Post.Cmd.Infrastructure.Stores
{
    public class EventStore : IEventStore
    {
        private readonly IEventStoreRepository _eventStoreRepository;
        private readonly IEventProducer _eventProducer;
        public EventStore(IEventStoreRepository eventStoreRepository, IEventProducer eventProducer)
        {
            _eventStoreRepository = eventStoreRepository;
            _eventProducer = eventProducer;
        }
        public async Task<List<BaseEvent>> GetEventsAsync(Guid aggregateId)
        {
            var eventStream = await _eventStoreRepository.FindByAggregateId(aggregateId);
            if (eventStream == null || !eventStream.Any())
            {
                throw new AggregateNotFoundException("Incorrect post id provided");
            }

            return eventStream.OrderBy(e => e.Version).Select(e => e.EventData).ToList();
        }

        public async Task SaveEventAsync(Guid aggregateId, IEnumerable<BaseEvent> events, int expectedVersion)
        {
            var eventStream = await _eventStoreRepository.FindByAggregateId(aggregateId);

            if (expectedVersion != -1 && eventStream[^1].Version != expectedVersion)
            {
                throw new ConcurrencyExcpetion();
            }

            var version = expectedVersion;
            foreach (var @event in events)
            {
                version++;
                @event.Version = version;
                var eventType = @event.GetType().Name;
                var eventModel = new EventModel
                {
                    TimeStamp = DateTime.Now,
                    AggregateIdentifier = aggregateId,
                    AggregateType = nameof(PostAggregate),
                    Version = version,
                    EventType = eventType,
                    EventData = @event,
                };

                await _eventStoreRepository.SaveAsync(eventModel);

                var topic = Environment.GetEnvironmentVariable("KAFKA_TOPIC");
                await _eventProducer.ProduceAsync(topic, @event);
            }
        }
    }


}
