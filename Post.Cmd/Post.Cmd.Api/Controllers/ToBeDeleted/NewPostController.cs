﻿//using CQRS.Core.Exceptions;
//using CQRS.Core.Infrastructure;
//using Microsoft.AspNetCore.Mvc;
//using Post.Cmd.Api.Commands;
//using Post.Cmd.Api.DTOs.Response;
//using Post.Common.DTOs;

//namespace Post.Cmd.Api.Controllers
//{
//    [ApiController]
//    [Route("api/v1/[controller]")]
//    public class NewPostController : ControllerBase
//    {
//        private ILogger<NewPostController> _logger;
//        private ICommandDispatcher _commandDispatcher;

//        public NewPostController(ILogger<NewPostController> logger, ICommandDispatcher commandDispatcher)
//        {
//            _logger = logger;
//            _commandDispatcher = commandDispatcher;
//        }

//        [HttpPost]
//        public async Task<ActionResult> NewPostAsync(NewPostCommand command)
//        {
//            var id = Guid.NewGuid();
//            try
//            {
//                command.Id = id;
//                await _commandDispatcher.SendAsync(command);

//                return StatusCode(StatusCodes.Status201Created, new NewPostResponseDto { Message = "New post creation completed successfully." });
//            }
//            catch (InvalidOperationException ex)
//            {
//                _logger.Log(LogLevel.Warning, ex, "Client made a bad request");
//                return BadRequest(new BaseResponse
//                {
//                    Message = ex.Message
//                });
//            }
//            catch (Exception ex)
//            {
//                const string SAFE_ERROR_MESSAGE = "Error while processing request while creating post.";
//                _logger.Log(LogLevel.Error, ex, SAFE_ERROR_MESSAGE);
//                return StatusCode(StatusCodes.Status500InternalServerError, new NewPostResponseDto { Id = id, Message = SAFE_ERROR_MESSAGE });
//            }
//        }

//    }
//}
