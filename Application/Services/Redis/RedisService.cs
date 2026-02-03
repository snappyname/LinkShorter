using Application.Abstract.Redis;
using Domain;
using StackExchange.Redis;

namespace Application.Services.Redis
{
    public class RedisService : IRedisService
    {
        private readonly IDatabase _db;

        public RedisService(IConnectionMultiplexer redis)
        {
            _db = redis.GetDatabase();
        }

        public async Task SetLinkAsync(ShortLink link)
        {
            await _db.StringSetAsync(link.ShortUrl, link.OriginalUrl);
        }

        public async Task SetLinksAsync(List<ShortLink> links)
        {
            var entries = links
                .Select(x => new KeyValuePair<RedisKey, RedisValue>(
                    x.ShortUrl,
                    x.OriginalUrl))
                .ToArray();

            await _db.StringSetAsync(entries);
        }

        public async Task DeleteLinkAsync(ShortLink link)
        {
            await _db.KeyDeleteAsync(link.ShortUrl);
        }

        public async Task<string> GetLinkAsync(string shortUrl)
        {
            return await _db.StringGetAsync(shortUrl);
        }
    }
}
