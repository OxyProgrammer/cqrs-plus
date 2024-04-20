using Post.Query.Domain.Entities;

namespace Post.Query.Domain.Repository
{
    public interface ICommentRepository
    {
        Task CreateAsync(CommentEntity comment);

        Task UpdateAsync(CommentEntity comment);

        Task<PostEntity> GetByIdAsync(Guid commentId);

        Task DeleteAsync(Guid commentId);
    }
}
