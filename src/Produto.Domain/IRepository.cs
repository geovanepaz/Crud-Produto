using Produto.Domain.DomainObjects;
using System;

namespace Produto.Domain
{
    public interface IRepository<T> : IDisposable where T : IAggregateRoot
    {
        IUnitOfWork UnitOfWork { get; }
    }
}
