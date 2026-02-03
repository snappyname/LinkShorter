using Application.Abstract.Redis;
using Dal;
using Microsoft.EntityFrameworkCore;

namespace TemplateWebApi.Infostructure
{
    public class RedisWarmupService : BackgroundService
    {
        private readonly IServiceScopeFactory _scopeFactory;

        public RedisWarmupService(IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            using var scope = _scopeFactory.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            var redis = scope.ServiceProvider.GetRequiredService<IRedisService>();
            const int batchSize = 5_000;
            var offset = 0;

            while (!stoppingToken.IsCancellationRequested)
            {
                var links = await db.ShortLinks
                    .AsNoTracking()
                    .OrderBy(x => x.Id)
                    .Skip(offset)
                    .Take(batchSize)
                    .ToListAsync(stoppingToken);

                if (links.Count == 0)
                    break;

                await redis.SetLinksAsync(links);
                offset += batchSize;
            }
        }
    }
}
