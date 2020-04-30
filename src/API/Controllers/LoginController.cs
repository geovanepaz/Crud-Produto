using Core.ViewModels.Login;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Produto.Application.ViewModels.AppSettings;
using Produto.Application.ViewModels.BadRequest;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/login")]
    public class LoginController : LoginBase
    {
        public LoginController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, IOptions<AppSettingsJwt> appSettings) : base(userManager, signInManager, appSettings)
        { }

        [HttpPost]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        [ProducesResponseType(typeof(BadRequest), (int)HttpStatusCode.BadRequest)]
        [Route("usuario")]
        public async Task<IActionResult> CriarUsuarioAsync([FromBody] UsuarioRequest request)
        {
            var result = await CriarUsuario(request.Email, request.Senha);
            if (result.Succeeded) return Ok();

            return BadRequest(new BadRequest(result.Errors.Select(x => x.Description).ToList()));
        }

        [HttpPost]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        [ProducesResponseType(typeof(BadRequest), (int)HttpStatusCode.BadRequest)]
        public async Task<IActionResult> LoginAsync([FromBody] LoginRequest resgate)
        {
            var result = await Logar(resgate.Email, resgate.Senha);
            if (result.Succeeded)
            {
                return Ok(await GerarJwtAsync(resgate.Email));
            }

            if (result.IsLockedOut)
            {
                return BadRequest(new BadRequest("Usuário temporariamente bloqueado por tentativas inválidas"));
            }

            return BadRequest(new BadRequest("Usuário ou senha incorretos"));
        }
    }
}
