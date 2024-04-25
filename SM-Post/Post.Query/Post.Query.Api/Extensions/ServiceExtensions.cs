using Polly;
using Post.Query.Infrastructure.DataAccess;

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
    }
}
