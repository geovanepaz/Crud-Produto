using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Produto.Domain
{
    public interface IProdutoRepository : IRepository<Produto>
    {
        Task<IEnumerable<Produto>> ObterTodosAsync();
        Task<Produto> ObterPorIdAsync(Guid id);
        Task<Categoria> ObterCategoriaPorIdAsync(Guid id);
        Task<IEnumerable<Produto>> ObterPorCategoriaAsync(int codigo);
        Task<IEnumerable<Categoria>> ObterCategoriasAsync();
        IQueryable<Domain.Produto> Query();

        void Adicionar(Produto produto);
        void Atualizar(Produto produto);

        void Deletar(Domain.Produto produto);

        void Adicionar(Categoria categoria);
        void Atualizar(Categoria categoria);
    }
}
