using Domain;
using DTO;

namespace Application.Abstract.Links
{
    public interface ILinkService
    {
        Task<LinkModel> GetLink(LinkModel inputLinkModel);
        Task<LinkModel> CreateAnonymousLink(LinkModel inputLinkModel);
        Task<LinkModel> CreateUserLink(CreateLinkModel linkModel, User owner);
        Task<List<UserLinkModel>> GetUserLinks(User owner);
        Task DeleteUserLink(long linkId, User owner);
    }
}
