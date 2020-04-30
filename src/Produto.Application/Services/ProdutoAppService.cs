using AutoMapper;
using Produto.Application.ViewModels.Produto;
using Produto.Domain;
using Produto.Domain.DomainObjects;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.Extensions.Caching.Distributed;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using System.IO;

namespace Produto.Application.Services
{
    public class ProdutoAppService : IProdutoAppService
    {
        private readonly IProdutoRepository _produtoRepository;
        private readonly IEstoqueService _estoqueService;
        private readonly IMapper _mapper;
        private readonly IDistributedCache _cache;
        private DistributedCacheEntryOptions _opcoesCache;

        public ProdutoAppService(IProdutoRepository produtoRepository,
                                 IMapper mapper,
                                 IEstoqueService estoqueService, IDistributedCache cache)
        {
            _produtoRepository = produtoRepository;
            _mapper = mapper;
            _estoqueService = estoqueService;
            _cache = cache;

            _opcoesCache = new DistributedCacheEntryOptions();
            _opcoesCache.SetAbsoluteExpiration(TimeSpan.FromMinutes(20));
        }

        public async Task<IEnumerable<ProdutoRequest>> ObterPorCategoriaAsync(int codigo)
        {
            return _mapper.Map<IEnumerable<ProdutoRequest>>(await _produtoRepository.ObterPorCategoriaAsync(codigo));
        }

        public async Task DeletarAsync(Guid id)
        {
            var produto = await _produtoRepository.ObterPorIdAsync(id);
            if (produto == null)
            {
                throw new NotFoundException();
            }

            _produtoRepository.Deletar(produto);
            await _produtoRepository.UnitOfWork.Commit();
        }

        public async Task<ProdutoResponse> ObterPorIdAsync(Guid id)
        {
            return _mapper.Map<ProdutoResponse>(await _produtoRepository.ObterPorIdAsync(id));
        }
        public async Task<FiltrarProdutoResponse> FiltrarProdutoAsync(string termo, string colunaOrdenacao, int itensPorPagina, int pagina, bool ordeCrescente)
        {
            if (itensPorPagina == 0) return null;

            pagina = Math.Abs(pagina);
            itensPorPagina = Math.Abs(itensPorPagina);
            var totalRegistro = 0;

            pagina = pagina == 0 ? 1 : pagina;
            int qtdRegistro = itensPorPagina * (pagina - 1);

            var query = _produtoRepository.Query();
            if (!string.IsNullOrEmpty(termo))
            {
                query = query.Where(p => p.Nome.Contains(termo) || p.Descricao.Contains(termo));
            }

            totalRegistro = await query.CountAsync();
            if (totalRegistro == 0) return null;

            query = OrdernarBusca(colunaOrdenacao, ordeCrescente, query);
            query = query.Skip(qtdRegistro).Take(itensPorPagina);

            var produtoResponse = _mapper.Map<IEnumerable<ProdutoResponse>>(await query.ToListAsync());
            if (produtoResponse.Count() == 0) return null;

            produtoResponse = BuscarImagem(produtoResponse.ToList());
            return new FiltrarProdutoResponse
            {
                QuantidadeTotal = totalRegistro,
                Produtos = produtoResponse,
            };
        }
        public async Task<CategoriaResponse> ObterCategoriaPorIdAsync(Guid id)
        {
            return _mapper.Map<CategoriaResponse>(await _produtoRepository.ObterCategoriaPorIdAsync(id)); ;
        }

        public async Task<IEnumerable<ProdutoResponse>> ObterTodosAsync()
        {
            var produtoRedis = await _cache.GetAsync("produto:ObterTodosAsync");
            if (produtoRedis == null)
            {
                var produtos = _mapper.Map<IEnumerable<ProdutoResponse>>(await _produtoRepository.ObterTodosAsync());

                _cache.SetString("produto:ObterTodosAsync", JsonSerializer.Serialize(produtos), _opcoesCache);
                return produtos;
            }

            return JsonSerializer.Deserialize<IEnumerable<ProdutoResponse>>(produtoRedis);
        }

        public async Task<IEnumerable<CategoriaResponse>> ObterCategorias()
        {
            return _mapper.Map<IEnumerable<CategoriaResponse>>(await _produtoRepository.ObterCategoriasAsync());
        }

        public async Task<Guid> AdicionarProdutoAsync(ProdutoRequest request)
        {
            var produto = _mapper.Map<Domain.Produto>(request);
            _produtoRepository.Adicionar(produto);

            await _produtoRepository.UnitOfWork.Commit();
            _ = _cache.RemoveAsync("produto:ObterTodosAsync");

            return produto.Id;
        }
        public async Task AdicionarCategoriaAsync(CategoriaRequest request)
        {
            var categoria = _mapper.Map<Categoria>(request);
            _produtoRepository.Adicionar(categoria);

            await _produtoRepository.UnitOfWork.Commit();
        }

        public async Task AtualizarProdutoAsync(ProdutoUpdateRequest request)
        {
            if (await _produtoRepository.ObterPorIdAsync(request.Id.Value) == null)
            {
                throw new BadRequestException("Produdo não encontrado");
            }

            var produto = _mapper.Map<Domain.Produto>(request);
            _produtoRepository.Atualizar(produto);

            await _produtoRepository.UnitOfWork.Commit();
            _ = _cache.RemoveAsync("produto:ObterTodosAsync");
        }

        public async Task<ProdutoRequest> DebitarEstoqueAsync(Guid id, int quantidade)
        {
            if (!_estoqueService.DebitarEstoqueAsync(id, quantidade).Result)
            {
                throw new DomainException("Falha ao debitar estoque");
            }

            return _mapper.Map<ProdutoRequest>(await _produtoRepository.ObterPorIdAsync(id));
        }

        public async Task<ProdutoRequest> ReporEstoqueAsync(Guid id, int quantidade)
        {
            if (!_estoqueService.ReporEstoqueAsync(id, quantidade).Result)
            {
                throw new DomainException("Falha ao repor estoque");
            }

            return _mapper.Map<ProdutoRequest>(await _produtoRepository.ObterPorIdAsync(id));
        }

        public void Dispose()
        {
            _produtoRepository?.Dispose();
            _estoqueService?.Dispose();
        }

        private List<ProdutoResponse> BuscarImagem(List<ProdutoResponse> produtos)
        {
            var caminhoImagem = "";
            produtos.ForEach(p =>
            {
                caminhoImagem = $"./wwwroot/files/{p.Imagem}.jpg";
                if (File.Exists(caminhoImagem))
                {
                    p.ImagemByte = File.ReadAllBytes(caminhoImagem);
                }

            });

            return produtos;
        }

        private IQueryable<Domain.Produto> OrdernarBusca(string colunaOrdenacao, bool ordeCrescente, IQueryable<Domain.Produto> query)
        {
            Expression<Func<Domain.Produto, object>> order;

            switch (colunaOrdenacao?.ToLower())
            {
                case "id":
                    order = p => p.Id;
                    break;
                case "nome":
                    order = p => p.Nome;
                    break;
                case "descricao":
                    order = p => p.Descricao;
                    break;
                case "quantidadeestoque":
                    order = p => p.QuantidadeEstoque;
                    break;
                default:
                    order = p => p.Id;
                    break;
            }

            if (ordeCrescente)
            {
                return query.OrderBy(order);
            }

            return query.OrderByDescending(order);
        }
    }
}
