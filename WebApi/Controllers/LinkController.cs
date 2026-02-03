using Application.Abstract.Links;
using Dal;
using DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TemplateWebApi.Controllers.Base;

namespace TemplateWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LinkController: BaseController
    {
        private readonly ILinkService _linkService;

        public LinkController(ILinkService linkService, AppDbContext context) : base(context)
        {
            _linkService = linkService;
        }
        
        [AllowAnonymous]
        [HttpPost("GetLink")]
        public async Task<IActionResult> GetLink(LinkModel linkModel)
        {
            return Ok(await _linkService.GetLink(linkModel));
        }
        
        [AllowAnonymous]
        [HttpPost("CreateAnonymousLink")]
        public async Task<IActionResult> CreateAnonymousLink(LinkModel linkModel)
        {
            return Ok(await _linkService.CreateAnonymousLink(linkModel));
        }
        
        [HttpPut("CreateUserLink")]
        public async Task<IActionResult> CreateUserLink(CreateLinkModel linkModel)
        {
            return Ok(await _linkService.CreateUserLink(linkModel, User));
        }

        [HttpGet("UserLinks")]
        public async Task<IActionResult> GetUserLinks()
        {
            return Ok(await _linkService.GetUserLinks(User));
        }
        
        [HttpDelete("DeleteUserLink/{id}")]
        public async Task<IActionResult> DeleteUserLink(long id)
        {
            await _linkService.DeleteUserLink(id, User);
            return Ok();
        }
    }
}
