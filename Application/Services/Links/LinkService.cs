using Application.Abstract.Links;
using Application.Abstract.Redis;
using Application.Exceptions;
using Dal;
using Domain;
using DTO;
using Mapster;
using Microsoft.EntityFrameworkCore;

namespace Application.Services.Links
{
    public class LinkService : ILinkService
    {
        private readonly AppDbContext _context;
        private readonly IRedisService _redisService;

        public LinkService(AppDbContext context, IRedisService redisService)
        {
            _context = context;
            _redisService = redisService;
        }

        public async Task<LinkModel> GetLink(LinkModel inputLinkModel)
        {
            var redisResult = await _redisService.GetLinkAsync(inputLinkModel.Link);
            if (redisResult != null)
            {
                return new LinkModel() { Link = redisResult };
            }
            var dbResult = await _context.ShortLinks.FirstOrDefaultAsync(x => x.ShortUrl == inputLinkModel.Link);
            if (dbResult != null)
            {
                await _redisService.SetLinkAsync(dbResult);
                return new LinkModel() { Link = dbResult.OriginalUrl };
            }
            throw new ShortLinkNotFound();
        }

        public async Task<LinkModel> CreateAnonymousLink(LinkModel inputLinkModel)
        {
            var lastAnonymousLink = await _context.ShortLinks
                .Where(x => x.OwnerId == null)
                .OrderByDescending(x => x.CreateTime)
                .FirstOrDefaultAsync();
            var newLink =
                LinkGenerator.GetNextLink(lastAnonymousLink == null ? string.Empty : lastAnonymousLink.ShortUrl);

            while (await _context.ShortLinks.AnyAsync(x => x.ShortUrl == newLink))
            {
                newLink = LinkGenerator.GetNextLink(newLink);
            }

            var newShortLink = new ShortLink(inputLinkModel.Link, newLink);
            await _context.ShortLinks.AddAsync(newShortLink);
            await _context.SaveChangesAsync();
            await _redisService.SetLinkAsync(newShortLink);
            return new LinkModel() { Link = newLink };
        }

        public async Task<LinkModel> CreateUserLink(CreateLinkModel linkModel, User owner)
        {
            var link = await _context.ShortLinks
                .FirstOrDefaultAsync(x => x.ShortUrl == linkModel.ShortenedLink);
            if (link?.OwnerId != null)
            {
                throw new LinkAlreadyInUseException();
            }

            if (link != null && link.OwnerId == null)
            {
                _context.ShortLinks.Remove(link);
            }

            var newShortLink = new ShortLink(linkModel.OriginalLink, linkModel.ShortenedLink, owner);
            await _context.ShortLinks.AddAsync(newShortLink);
            await _context.SaveChangesAsync();
            await _redisService.SetLinkAsync(newShortLink);
            return new LinkModel() { Link = linkModel.ShortenedLink };
        }

        public async Task<List<UserLinkModel>> GetUserLinks(User owner)
        {
            return await _context.ShortLinks
                .Where(x => x.OwnerId == owner.Id)
                .ProjectToType<UserLinkModel>()
                .ToListAsync();
            ;
        }

        public async Task DeleteUserLink(long linkId, User owner)
        {
            var link = await _context.ShortLinks.Where(x => x.Id == linkId).FirstOrDefaultAsync();
            if (link == null || link.OwnerId != owner.Id)
            {
                throw new NotImplementedException();
            }

            _context.ShortLinks.Remove(link);
            await _context.SaveChangesAsync();
            await _redisService.DeleteLinkAsync(link);
        }
    }
}
