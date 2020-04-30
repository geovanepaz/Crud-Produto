using System;
using System.Threading.Tasks;

namespace Produto.Domain
{
    public interface IEstoqueService : IDisposable
    {
        Task<bool> DebitarEstoqueAsync(Guid produtoId, int quantidade);
        Task<bool> ReporEstoqueAsync(Guid produtoId, int quantidade);
    }
}
