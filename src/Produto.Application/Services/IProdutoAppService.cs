using Produto.Application.ViewModels.Produto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Produto.Application.Services
{
    public interface IProdutoAppService : IDisposable
    {
        Task<IEnumerable<ProdutoRequest>> ObterPorCategoriaAsync(int codigo);
        Task<ProdutoResponse> ObterPorIdAsync(Guid id);
        Task<CategoriaResponse> ObterCategoriaPorIdAsync(Guid id);
        Task<IEnumerable<ProdutoResponse>> ObterTodosAsync();
        Task<IEnumerable<CategoriaResponse>> ObterCategorias();
        Task<FiltrarProdutoResponse> FiltrarProdutoAsync(string termo, string colunaOrdenacao, int itensPorPagina, int pagina, bool ordeCrescente);

        Task<Guid> AdicionarProdutoAsync(ProdutoRequest request);
        Task AdicionarCategoriaAsync(CategoriaRequest request);
        Task AtualizarProdutoAsync(ProdutoUpdateRequest request);

        Task<ProdutoRequest> DebitarEstoqueAsync(Guid id, int quantidade);
        Task<ProdutoRequest> ReporEstoqueAsync(Guid id, int quantidade);
        Task DeletarAsync(Guid id);
    }
}
