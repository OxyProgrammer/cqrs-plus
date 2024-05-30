using CQRS.Core.Queries;

namespace Post.Query.Api.Queries
{
    public class FindCommentByIdQuery:BaseQuery
    {
        public Guid PostId { get; set; }
        public Guid CommentId { get; set; }
    }
}
