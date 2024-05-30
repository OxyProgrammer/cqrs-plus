using AutoMapper;
using CQRS.Core.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Post.Cmd.Api.Commands;
using Post.Cmd.Api.DTOs.Request;
using Post.Cmd.Api.DTOs.Response;

namespace Post.Cmd.Api.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class PostsController : ControllerBase
    {
        private readonly ICommandDispatcher _commandDispatcher;
        private readonly IMapper _mapper;

        public PostsController(ICommandDispatcher commandDispatcher, IMapper mapper)
        {
            _commandDispatcher = commandDispatcher;
            _mapper = mapper;
        }

        /// <summary>
        /// Creates a new Post.
        /// </summary>
        /// <param name="command"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult> NewPostAsync([FromBody] NewPostDto newPostDto)
        {
            var id = Guid.NewGuid();
            var command = _mapper.Map<NewPostCommand>(newPostDto);
            command.Id = id;
            await _commandDispatcher.SendAsync(command);
            return StatusCode(StatusCodes.Status201Created, new NewPostResponseDto { Id = id, Message = "New post creation completed successfully." });
        }

        /// <summary>
        /// Edits a new post .
        /// </summary>
        /// <param name="id"></param>
        /// <param name="command"></param>
        /// <returns></returns>
        [HttpPut("{id:guid}")]
        public async Task<ActionResult> EditPostAsync(Guid id, [FromBody] EditPostDto editPostDto)
        {
            var command = _mapper.Map<EditPostCommand>(editPostDto);
            command.Id = id;
            await _commandDispatcher.SendAsync(command);
            return Ok("Edit post request completed successfully.");
        }

        /// <summary>
        /// Likes a post for given Id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPut("like/{id:guid}")]
        public async Task<ActionResult> LikePostAsync(Guid id)
        {
            await _commandDispatcher.SendAsync(new LikePostCommand { Id = id });
            return Ok("Like post request completed successfully.");
        }

        /// <summary>
        /// Deletes an existing post.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="command"></param>
        /// <returns></returns>
        [HttpDelete("{id:guid}")]
        public async Task<ActionResult> DeletePostAsync(Guid id, [FromBody] DeletePostDto deletePostDto)
        {
            var command = new DeletePostCommand { Id = id, Username = deletePostDto.Username };
            await _commandDispatcher.SendAsync(command);
            return Ok("Delete post request completed successfully.");
        }
    }
}
