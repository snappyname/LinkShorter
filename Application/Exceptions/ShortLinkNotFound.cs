namespace Application.Exceptions
{
    public class ShortLinkNotFound: Exception
    {
        public int StatusCode { get; } = 404;
        public string ErrorCode { get; } = "ShortLinkNotFound";

        public ShortLinkNotFound(string message = "Ссылка не найдена") : base(message) { }
    }
}
