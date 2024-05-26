using CQRS.Core.Exceptions;
using Microsoft.AspNetCore.Diagnostics;
using Post.Common.DTOs;
using System.Net;

namespace Post.Cmd.Api
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
                var response = new ErrorResponse
                {
                    Message = contextFeature.Error.Message,
                };

                /* IF THE BELOW CODE IS HARD TO FOLLOW, BELOW IS THE EXPLANATION:
                 *  - C# PATTERN MATCHING AS OF .NET 8.0, DPOEST NOT SUPPORT VOID, IT MUST RETURN SOMETHING.
                 *  - THE BELOW CODE RETURNS AN ACTION AND IMMEDIATELY INVOKES IT.
                 */
                (contextFeature.Error switch
                {
                    AggregateNotFoundException => new Action(() =>
                    {
                        httpContext.Response.StatusCode = StatusCodes.Status404NotFound;
                        _logger.Log(LogLevel.Warning, exception, "Could not retrieve aggregate, client passed an incorrect post id targetting the aggregate.");
                    }),
                    InvalidOperationException=>new Action(() =>
                    {
                        httpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
                        _logger.Log(LogLevel.Warning, exception, "Client made a bad request");
                    }),
                    _ => new Action(() =>
                    {
                        //Change the response Message to something safe and generic so that the client wont have an idea about the internal systems error.
                        response.Message = "Sorry :-( Some error occurred while processing your request, please raise this to us!";
                        httpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;
                        _logger.Log(LogLevel.Error, exception, "Unhandled error occurred!");
                    })
                })();
                //Copy the status code from httpContext.Response to the return model.
                response.StatusCode = httpContext.Response.StatusCode;
                //Return the error model/dto
                await httpContext.Response.WriteAsync(response.ToString());
            }
            return true;
        }

    }
}
