namespace Application.Exceptions
{
    public class LinkAlreadyInUseException : Exception
    {
        public int StatusCode { get; } = 409;
        public string ErrorCode { get; } = "ShortLinkNotFound";
    }
}
