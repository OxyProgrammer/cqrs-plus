using CQRS.Core.Infrastructure;
using CQRS.Core.Queries;
using Post.Query.Domain.Entities;

namespace Post.Query.Infrastructure.Dispatchers
{
    public class CommentQueryDispatcher : IQueryDispatcher<CommentEntity>
    {
        private readonly Dictionary<Type, Func<BaseQuery, Task<List<CommentEntity>>>> _handlers = new();

        public void RegisterHandler<TQuery>(Func<TQuery, Task<List<CommentEntity>>> handler) where TQuery : BaseQuery
        {
            if (_handlers.ContainsKey(typeof(TQuery)))
            {
                throw new IndexOutOfRangeException("Can't register the same query handler twice.");
            }
            _handlers.Add(typeof(TQuery), x => handler((TQuery)x));
        }

        public async Task<List<CommentEntity>> SendAsync(BaseQuery query)
        {
            if (_handlers.TryGetValue(query.GetType(), out Func<BaseQuery, Task<List<CommentEntity>>> handler))
            {
                return await handler(query);
            }
            throw new ArgumentNullException(nameof(handler), "Query handler not registered.");
        }
    }
}
