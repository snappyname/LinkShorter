namespace Domain
{
    public class ShortLink
    {
        public long Id { get; set; }
        public string OriginalUrl { get; set; }
        public string ShortUrl { get; set; }
        public User? Owner { get; set; }
        public string? OwnerId { get; set; }
        public string CreateTime { get; set; }
        
        public ShortLink(string originalUrl, string shortUrl)
        {
            CreateTime = DateTime.Now.ToShortTimeString();
            OriginalUrl = originalUrl;
            ShortUrl = shortUrl;
        }

        public ShortLink(string originalUrl, string shortUrl, User owner)
        {
            CreateTime = DateTime.Now.ToShortTimeString();
            OriginalUrl = originalUrl;
            ShortUrl = shortUrl;
            Owner = owner;
            OwnerId = owner.Id;
        }
        
    }
}
