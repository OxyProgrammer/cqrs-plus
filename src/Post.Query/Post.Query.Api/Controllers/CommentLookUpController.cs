using CQRS.Core.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Post.Query.Api.Queries;
using Post.Query.Domain.Entities;

namespace Post.Query.Api.Controllers
{
    [ApiController]
    [Route("api/v1/posts/{postId}/[controller]")]
    public class CommentLookUpController : ControllerBase
    {
        private readonly IQueryDispatcher<CommentEntity> _queryDispatcher;

        public CommentLookUpController(IQueryDispatcher<CommentEntity> queryDispatcher)
        {
            _queryDispatcher = queryDispatcher;
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetCommentByIdAsync(Guid postId, Guid id)
        {
            var comments = await _queryDispatcher.SendAsync(new FindCommentByIdQuery { PostId = postId, CommentId = id });
            if (comments == null || !comments.Any())
            {
                return NoContent();
            }
            return Ok(comments.FirstOrDefault());
        }
    }
}
