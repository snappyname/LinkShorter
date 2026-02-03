using Domain;
using DTO;
using Mapster;

namespace Application.Services.Links.MappingConfigurations
{
    public class LinkServiceMapping
    {
        public static void Register()
        {
            TypeAdapterConfig<ShortLink, UserLinkModel>
                .NewConfig()
                .Map(dest => dest.OriginalUrl, src => src.OriginalUrl)
                .Map(dest => dest.ShortUrl, src => src.ShortUrl)
                .Map(dest => dest.Id, src => src.Id)
                .Map(dest => dest.CreatedAt, src => src.CreateTime);
        }
    }
}
