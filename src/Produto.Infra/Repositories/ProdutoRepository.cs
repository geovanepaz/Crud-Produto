using Microsoft.EntityFrameworkCore;
using Produto.Domain;
using Produto.Infra.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Produto.Infra.Repositories
{
    public class ProdutoRepository : IProdutoRepository
    {
        private readonly ProdutoContext _context;

        public ProdutoRepository(ProdutoContext context)
        {
            _context = context;
        }

        public IUnitOfWork UnitOfWork => _context;

        public void Deletar(Domain.Produto produto)
        {
            _context.Produtos.Remove(produto);
        }

        public async Task<IEnumerable<Domain.Produto>> ObterTodosAsync()
        {
            return await _context.Produtos.AsNoTracking().ToListAsync();
        }

        public IQueryable<Domain.Produto> Query()
        {
            return _context.Produtos.AsNoTracking().AsQueryable();
        }

        public async Task<Domain.Produto> ObterPorIdAsync(Guid id)
        {
            return await _context.Produtos.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IEnumerable<Domain.Produto>> ObterPorCategoriaAsync(int codigo)
        {
            return await _context.Produtos.AsNoTracking().Include(p => p.Categoria).Where(c => c.Categoria.Codigo == codigo).ToListAsync();
        }

        public async Task<IEnumerable<Categoria>> ObterCategoriasAsync()
        {
            return await _context.Categorias.AsNoTracking().ToListAsync();
        }

        public async Task<Categoria> ObterCategoriaPorIdAsync(Guid id)
        {
            return await _context.Categorias.AsNoTracking().FirstOrDefaultAsync(c => c.Id == id);
        }

        public void Adicionar(Domain.Produto produto)
        {
            _context.Produtos.Add(produto);
        }

        public void Atualizar(Domain.Produto produto)
        {
            _context.Produtos.Update(produto);
        }

        public void Adicionar(Categoria categoria)
        {
            _context.Categorias.Add(categoria);
        }

        public void Atualizar(Categoria categoria)
        {
            _context.Categorias.Update(categoria);
        }

        public void Dispose()
        {
            _context?.Dispose();
        }
    }
}
