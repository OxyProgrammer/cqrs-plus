using AutoMapper;
using CQRS.Core.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Post.Query.Api.DTOs;
using Post.Query.Api.Queries;
using Post.Query.Domain.Entities;

namespace Post.Query.Api.Controllers
{
    [ApiController]
    [Route("api/v1/posts/{postId}/[controller]")]
    public class CommentsController : ControllerBase
    {
        private readonly IQueryDispatcher<CommentEntity> _queryDispatcher;
        private readonly IMapper _mapper;

        public CommentsController(IQueryDispatcher<CommentEntity> queryDispatcher, IMapper mapper)
        {
            _queryDispatcher = queryDispatcher;
            _mapper = mapper;
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetCommentByIdAsync(Guid postId, Guid id)
        {
            var comments = await _queryDispatcher.SendAsync(new FindCommentByIdQuery { PostId = postId, CommentId = id });
            if (comments == null || !comments.Any())
            {
                return NoContent();
            }
            var commentDto=_mapper.Map<CommentDto>(comments.FirstOrDefault());
            return Ok(commentDto);
        }
    }
}
