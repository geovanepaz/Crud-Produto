using System.Threading.Tasks;

namespace Produto.Domain
{
    public interface IUnitOfWork
    {
        Task<bool> Commit();
    }
}