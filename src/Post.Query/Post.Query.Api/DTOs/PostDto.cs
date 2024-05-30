using Post.Query.Domain.Entities;

namespace Post.Query.Api.DTOs
{
    public class PostDto
    {
        public Guid PostId { get; set; }

        public string Author { get; set; }

        public DateTime DatePosted { get; set; }

        public string Message { get; set; }

        public int Likes { get; set; }

        public IList<CommentEntity> Comments { get; set; }
    }
}
