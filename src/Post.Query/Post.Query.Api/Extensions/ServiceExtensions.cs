using CQRS.Core.Infrastructure;
using Polly;
using Post.Query.Api.Queries;
using Post.Query.Domain.Entities;
using Post.Query.Infrastructure.DataAccess;
using Post.Query.Infrastructure.Dispatchers;

namespace Post.Query.Api.Extensions
{
    public static class ServiceExtensions
    {
        public static void EsnureDbCreated(this IServiceCollection services)
        {
            var serviceProvider = services.BuildServiceProvider();
            using (var scope = serviceProvider.CreateScope())
            {
                var retryPolicy = Policy.Handle<Exception>()
                         .WaitAndRetry(5, retryAttempt => TimeSpan.FromSeconds(30));
                var retryCount = 0;
                retryPolicy.Execute(() =>
                {
                    var dbContext = scope.ServiceProvider.GetRequiredService<DatabaseContext>();
                    Console.WriteLine($"Trying for {++retryCount} time.");
                    dbContext.Database.EnsureCreated();
                });
            }
        }

        public static void ConfigureQueryHandlers(this IServiceCollection services)
        {
            var serviceProvider = services.BuildServiceProvider();
            using (var scope = serviceProvider.CreateScope())
            {
                var queryHandler = scope.ServiceProvider.GetRequiredService<IQueryHandler>();

                var postQueryDispatcher = new PostQueryDispatcher();
                var commentQueryDispatcher = new CommentQueryDispatcher();

                postQueryDispatcher.RegisterHandler<FindAllPostQuery>(queryHandler.HandleAsync);
                postQueryDispatcher.RegisterHandler<FindPostByIdQuery>(queryHandler.HandleAsync);
                postQueryDispatcher.RegisterHandler<FindPostsByAuthorQuery>(queryHandler.HandleAsync);
                postQueryDispatcher.RegisterHandler<FindPostsWithCommentsQuery>(queryHandler.HandleAsync);
                postQueryDispatcher.RegisterHandler<FindPostsWithLikesQuery>(queryHandler.HandleAsync);

                services.AddSingleton<IQueryDispatcher<PostEntity>>(_ => postQueryDispatcher);

                commentQueryDispatcher.RegisterHandler<FindCommentByIdQuery>(queryHandler.HandleAsync);
                services.AddSingleton<IQueryDispatcher<CommentEntity>>(_ => commentQueryDispatcher);
            }
        }
    }
}
