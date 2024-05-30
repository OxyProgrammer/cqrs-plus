namespace Post.Query.Api.DTOs
{
    public class CommentDto
    {
        public Guid CommentId { get; set; }

        public string Username { get; set; }

        public DateTime CommentDate { get; set; }

        public string Comment { get; set; }

        public bool Edited { get; set; }

        public Guid PostId { get; set; }
    }
}
