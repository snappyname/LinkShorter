using Application.Exceptions;

namespace TemplateWebApi.Middlewares
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            int statusCode = 500;
            string errorCode = "InternalServerError";

            if (exception is ShortLinkNotFound notFoundEx)
            {
                statusCode = notFoundEx.StatusCode;
                errorCode = notFoundEx.ErrorCode;
            }

            if (exception is LinkAlreadyInUseException alreadyEx)
            {
                statusCode = alreadyEx.StatusCode;
                errorCode = alreadyEx.ErrorCode;
            }

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = statusCode;
            return context.Response.WriteAsync(
                System.Text.Json.JsonSerializer.Serialize(new { errorCode })
            );
        }
    }

}
