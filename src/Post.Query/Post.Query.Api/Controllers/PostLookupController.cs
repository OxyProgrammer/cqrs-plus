using CQRS.Core.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Post.Query.Api.DTOs;
using Post.Query.Api.Queries;
using Post.Query.Domain.Entities;

namespace Post.Query.Api.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class PostLookupController : ControllerBase
    {
        private readonly IQueryDispatcher<PostEntity> _queryDispatcher;

        public PostLookupController(IQueryDispatcher<PostEntity> queryDispatcher)
        {
            _queryDispatcher = queryDispatcher;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllPostsAsync()
        {
            var posts = await _queryDispatcher.SendAsync(new FindAllPostQuery());
            return NormalResponse(posts);
        }

        [HttpGet("byId/{postId:guid}")]
        public async Task<ActionResult> GetPostByIdAsync(Guid postId)
        {
            var posts = await _queryDispatcher.SendAsync(new FindPostByIdQuery { Id = postId });
            return NormalResponse(posts);
        }

        [HttpGet("byAuthor/{author}")]
        public async Task<ActionResult> GetPostsByAuthorAsync(string author)
        {
            var posts = await _queryDispatcher.SendAsync(new FindPostsByAuthorQuery { Author = author });
            return NormalResponse(posts);
        }

        [HttpGet("withComments")]
        public async Task<ActionResult> GetPostsWithCommentsAsync()
        {
            var posts = await _queryDispatcher.SendAsync(new FindPostsWithCommentsQuery());
            return NormalResponse(posts);
        }

        [HttpGet("withLikes/{numberOfLikes:int}")]
        public async Task<ActionResult> GetPostsWithLikesAsync(int numberOfLikes)
        {
            var posts = await _queryDispatcher.SendAsync(new FindPostsWithLikesQuery { NumberOfLikes = numberOfLikes });
            return NormalResponse(posts);
        }

        private ActionResult NormalResponse(List<PostEntity> posts)
        {
            if (posts == null || !posts.Any())
            {
                return NoContent();
            }
            var count = posts.Count();
            return Ok(new PostLookupResponse() { Posts = posts, Message = $"Successfully returned {count} post{(count > 1 ? 's' : string.Empty)}" });
        }

    }
}
