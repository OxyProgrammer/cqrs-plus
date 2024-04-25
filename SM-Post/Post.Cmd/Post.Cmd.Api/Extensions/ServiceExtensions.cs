using CQRS.Core.Infrastructure;
using Post.Cmd.Api.Commands;
using Post.Cmd.Infrastructure.Dispatchers;

namespace Post.Cmd.Api.Extensions
{
    public static class ServiceExtensions
    {
        public static void ConfigureCommandHandlers(this IServiceCollection services)
        {
            var serviceProvider = services.BuildServiceProvider();
            using (var scope = serviceProvider.CreateScope())
            {
                var commandHandler = scope.ServiceProvider.GetRequiredService<ICommandHandler>();

                var dispatcher = new CommandDispatcher();

                dispatcher.RegisterHandler<NewPostCommand>(commandHandler.HandleAsync);
                dispatcher.RegisterHandler<EditMessageCommand>(commandHandler.HandleAsync);
                dispatcher.RegisterHandler<LikePostCommand>(commandHandler.HandleAsync);
                dispatcher.RegisterHandler<AddCommentCommand>(commandHandler.HandleAsync);
                dispatcher.RegisterHandler<EditCommentCommand>(commandHandler.HandleAsync);
                dispatcher.RegisterHandler<RemoveCommentCommand>(commandHandler.HandleAsync);
                dispatcher.RegisterHandler<DeletePostCommand>(commandHandler.HandleAsync);

                services.AddSingleton<ICommandDispatcher>(_ => dispatcher);
            }
        }
    }
}
