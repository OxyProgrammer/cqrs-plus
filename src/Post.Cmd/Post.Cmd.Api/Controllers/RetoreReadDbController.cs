using CQRS.Core.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Post.Cmd.Api.Commands;
using Post.Cmd.Api.DTOs;
using Post.Common.DTOs;

namespace Post.Cmd.Api.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class RetoreReadDbController : ControllerBase
    {
        private ILogger<RetoreReadDbController> _logger;
        private ICommandDispatcher _commandDispatcher;

        public RetoreReadDbController(ILogger<RetoreReadDbController> logger, ICommandDispatcher commandDispatcher)
        {
            _logger = logger;
            _commandDispatcher = commandDispatcher;
        }


        [HttpPost]
        public async Task<ActionResult> CreateReadDbAsync()
        {
            await _commandDispatcher.SendAsync(new RestoreReadDbCommand());
            return StatusCode(StatusCodes.Status201Created, "Read database response completed successfully.");
        }
    }
}
