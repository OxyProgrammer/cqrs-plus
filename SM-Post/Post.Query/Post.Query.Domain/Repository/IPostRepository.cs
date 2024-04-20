using Post.Query.Domain.Entities;

namespace Post.Query.Domain.Repository
{
    public interface IPostRepository
    {
        Task CreateAsync(PostEntity post);

        Task UpdateAsync(PostEntity post);

        Task DeleteAsync(PostEntity post);

        Task<PostEntity> GetByIdAsync(Guid postId);

        Task<List<PostEntity>> ListAllAsync();

        Task<List<PostEntity>> ListByAuthorAsync(string authorId);

        Task<List<PostEntity>> ListWithLikesAsync(int numberOfLikes);

        Task<List<PostEntity>> ListWithCommentsAsync();
    }
}
