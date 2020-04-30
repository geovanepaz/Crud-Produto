using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Produto.Application.Services;
using Produto.Application.ViewModels.BadRequest;
using Produto.Application.ViewModels.Produto;
using System;
using System.Net;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/produto")]
    [Authorize]
    public class ProdutoController : ControllerBase
    {
        private readonly IProdutoAppService appService;

        public ProdutoController(IProdutoAppService appService)
        {
            this.appService = appService;
        }

        [HttpPut]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        [ProducesResponseType(typeof(BadRequest), (int)HttpStatusCode.BadRequest)]
        public async Task<IActionResult> AtualizarProdutoAsync([FromBody] ProdutoUpdateRequest request)
        {
            await appService.AtualizarProdutoAsync(request);
            return Ok();
        }

        [HttpDelete]
        [Route("{id}")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> DeletarAsync(Guid id)
        {
            await appService.DeletarAsync(id);
            return Ok();
        }

        [HttpPost]
        [ProducesResponseType(typeof(Guid), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        [ProducesResponseType(typeof(BadRequest), (int)HttpStatusCode.BadRequest)]
        public async Task<IActionResult> AdicionarAsync([FromBody] ProdutoRequest request)
        {
            return Ok(await appService.AdicionarProdutoAsync(request));
        }

        [HttpPost]
        [Route("categoria")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        [ProducesResponseType(typeof(BadRequest), (int)HttpStatusCode.BadRequest)]
        public async Task<IActionResult> AdicionarCategoriaAsync([FromBody] CategoriaRequest request)
        {
            await appService.AdicionarCategoriaAsync(request);
            return Ok();
        }

        [HttpGet]
        [ProducesResponseType(typeof(ProdutoResponse), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        [ProducesResponseType(typeof(BadRequest), (int)HttpStatusCode.BadRequest)]
        public async Task<IActionResult> ObterTodosAsync()
        {
            return Ok(await appService.ObterTodosAsync());
        }

        [HttpGet]
        [Route("{guid}")]
        [ProducesResponseType(typeof(ProdutoResponse), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        [ProducesResponseType(typeof(BadRequest), (int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> ObterPorIdAsync(Guid guid)
        {
            var resposta = await appService.ObterPorIdAsync(guid);
            if (resposta == null)
            {
                return NotFound();
            }

            return Ok(resposta);
        }

        [HttpGet]
        [Route("paginacao")]
        [ProducesResponseType(typeof(FiltrarProdutoResponse), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        [ProducesResponseType(typeof(BadRequest), (int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> FiltrarProdutosAsync(string termo, string colunaOrdenacao, int itensPorPagina = 20, int pagina = 1, bool ordeCrescente = true)
        {
            var resposta = await appService.FiltrarProdutoAsync(termo, colunaOrdenacao, itensPorPagina, pagina, ordeCrescente);
            if (resposta == null)
            {
                return NotFound();
            }

            return Ok(resposta);
        }

        [HttpGet]
        [Route("categoria")]
        [ProducesResponseType(typeof(CategoriaResponse), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        [ProducesResponseType(typeof(BadRequest), (int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> ObterCategoriasAsync()
        {
            var resposta = await appService.ObterCategorias();
            if (resposta == null)
            {
                return NotFound();
            }

            return Ok(resposta);
        }

        [HttpGet]
        [Route("categoria/{id}")]
        [ProducesResponseType(typeof(CategoriaResponse), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        [ProducesResponseType(typeof(BadRequest), (int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> ObterCategoriaPorIdAsync(Guid id)
        {
            var resposta = await appService.ObterCategoriaPorIdAsync(id);
            if (resposta == null)
            {
                return NotFound();
            }

            return Ok(resposta);
        }
    }
}
