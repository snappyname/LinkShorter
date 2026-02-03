using Domain;

namespace Application.Abstract.Redis
{
    public interface IRedisService
    {
        Task SetLinkAsync(ShortLink link);
        Task<string> GetLinkAsync(string link);
        Task SetLinksAsync(List<ShortLink> links);
        Task DeleteLinkAsync(ShortLink link);
    }
}
