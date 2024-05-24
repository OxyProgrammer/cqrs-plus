using AutoMapper;
using CQRS.Core.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Post.Cmd.Api.Commands;
using Post.Cmd.Api.DTOs.Request;
using Post.Common.DTOs;

namespace Post.Cmd.Api.Controllers
{
    [ApiController]
    [Route("api/v1/posts/{postId}/[controller]")]
    public class CommentsController : ControllerBase
    {
        private readonly ILogger<CommentController> _logger;
        private readonly ICommandDispatcher _commandDispatcher;
        private readonly IMapper _mapper;

        public CommentController(ILogger<CommentController> logger, ICommandDispatcher commandDispatcher, IMapper mapper)
        {
            _logger = logger;
            _commandDispatcher = commandDispatcher;
            _mapper = mapper;
        }

        /// <summary>
        /// Adds a comment to a given post.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="command"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> AddCommentAsync(Guid postId, [FromBody] AddCommentDto addCommentDto)
        {
            var command = _mapper.Map<AddCommentCommand>(addCommentDto);
            command.Id = postId;
            await _commandDispatcher.SendAsync(command);

            return Ok(new BaseResponse
            {
                Message = "Add comment request completed successfully."
            });
            //return CreatedAtRoute("GetEmployeeForCompany", new { companyId, id = employeeToReturn.Id }, employeeToReturn);
        }

        /// <summary>
        /// Edits a comment for a given post.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="command"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<ActionResult> EditCommentAsync(Guid postId, Guid id, [FromBody] EditCommentDto editCommentDto)
        {
            var command = _mapper.Map<EditCommentCommand>(editCommentDto);
            command.Id = postId;
            command.CommentId = id;
            await _commandDispatcher.SendAsync(command);

            return Ok(new BaseResponse
            {
                Message = "Edit comment request completed successfully."
            });
        }

        /// <summary>
        /// Deletes a comment from a given post.
        /// </summary>
        /// <param name="postId"></param>
        /// <param name="id"></param>
        /// <param name="removeCommentDto"></param>
        /// <returns></returns>
        [HttpDelete("{id:guid}")]
        public async Task<ActionResult> RemoveCommentAsync(Guid postId, Guid id, [FromBody] RemoveCommentDto removeCommentDto)
        {
            var command = _mapper.Map<RemoveCommentCommand>(removeCommentDto);
            command.Id = postId;
            command.CommentId = id;
            await _commandDispatcher.SendAsync(command);

            return Ok(new BaseResponse
            {
                Message = "Remove comment request completed successfully."
            });
        }
    }
}
