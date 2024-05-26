using Microsoft.AspNetCore.Diagnostics;
using Post.Common.DTOs;
using System.Net;
namespace Post.Query.Api
{
    public class GlobalExceptionHandler : IExceptionHandler
    {
        private readonly ILogger<GlobalExceptionHandler> _logger;
        public GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger)
        {
            _logger = logger;
        }
        public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
        {
            httpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            httpContext.Response.ContentType = "application/json";
            var contextFeature = httpContext.Features.Get<IExceptionHandlerFeature>();
            if (contextFeature != null)
            {
                httpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;                
                //Return the error model/dto
                await httpContext.Response.WriteAsync(new ErrorResponse
                {
                    StatusCode = httpContext.Response.StatusCode,
                    Message = "Sorry :-( Some error occurred while processing your request, please raise this to us!"
                }.ToString());
            }
            return true;
        }

    }

}
