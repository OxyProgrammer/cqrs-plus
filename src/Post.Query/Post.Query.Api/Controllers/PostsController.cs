using AutoMapper;
using CQRS.Core.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Post.Query.Api.DTOs;
using Post.Query.Api.Queries;
using Post.Query.Domain.Entities;

namespace Post.Query.Api.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class PostsController : ControllerBase
    {
        private readonly IQueryDispatcher<PostEntity> _queryDispatcher;
        private readonly IMapper _mapper;

        public PostsController(IQueryDispatcher<PostEntity> queryDispatcher, IMapper mapper)
        {
            _queryDispatcher = queryDispatcher;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPostsAsync()
        {
            var posts = await _queryDispatcher.SendAsync(new FindAllPostQuery());
            return NormalResponse(posts);
        }

        [HttpGet("{postId:guid}")]
        public async Task<IActionResult> GetPostByIdAsync(Guid postId)
        {
            var posts = await _queryDispatcher.SendAsync(new FindPostByIdQuery { Id = postId });
            if (posts == null || !posts.Any())
            {
                return NoContent();
            }
            var postDto = _mapper.Map<PostDto>(posts.FirstOrDefault());
            return Ok(postDto);
        }

        [HttpGet("byAuthor/{author}")]
        public async Task<IActionResult> GetPostsByAuthorAsync(string author)
        {
            var posts = await _queryDispatcher.SendAsync(new FindPostsByAuthorQuery { Author = author });
            return NormalResponse(posts);
        }

        [HttpGet("withComments")]
        public async Task<IActionResult> GetPostsWithCommentsAsync()
        {
            var posts = await _queryDispatcher.SendAsync(new FindPostsWithCommentsQuery());
            return NormalResponse(posts);
        }

        [HttpGet("withLikes/{numberOfLikes:int}")]
        public async Task<IActionResult> GetPostsWithLikesAsync(int numberOfLikes)
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

            return Ok(new PostLookupResponse() { Posts = _mapper.Map<IEnumerable<PostDto>>(posts), Message = $"Successfully returned {count} post{(count > 1 ? 's' : string.Empty)}" });
        }

    }
}
