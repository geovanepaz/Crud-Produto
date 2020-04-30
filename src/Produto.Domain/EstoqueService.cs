using System;
using System.Threading.Tasks;

namespace Produto.Domain
{
    public class EstoqueService : IEstoqueService
    {
        private readonly IProdutoRepository _produtoRepository;

        public EstoqueService(IProdutoRepository produtoRepository)
        {
            _produtoRepository = produtoRepository;
        }

        public async Task<bool> DebitarEstoqueAsync(Guid produtoId, int quantidade)
        {
            var produto = await _produtoRepository.ObterPorIdAsync(produtoId);

            if (produto == null) return false;

            if (!produto.PossuiEstoque(quantidade)) return false;

            produto.DebitarEstoque(quantidade);

            _produtoRepository.Atualizar(produto);
            return await _produtoRepository.UnitOfWork.Commit();
        }

        public async Task<bool> ReporEstoqueAsync(Guid produtoId, int quantidade)
        {
            var produto = await _produtoRepository.ObterPorIdAsync(produtoId);

            if (produto == null) return false;
            produto.ReporEstoque(quantidade);

            _produtoRepository.Atualizar(produto);
            return await _produtoRepository.UnitOfWork.Commit();
        }

        public void Dispose()
        {
            _produtoRepository.Dispose();
        }
    }
}
