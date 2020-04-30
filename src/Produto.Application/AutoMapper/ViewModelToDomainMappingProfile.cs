using AutoMapper;
using Produto.Application.ViewModels.Produto;
using Produto.Domain;
using System;

namespace Produto.Application.AutoMapper
{
    public class ViewModelToDomainMappingProfile : Profile
    {
        public ViewModelToDomainMappingProfile()
        {
            CreateMap<ProdutoRequest, Domain.Produto>()
                .ConstructUsing(p =>
                    new Domain.Produto(p.Nome, p.Descricao, true,
                        p.Valor, p.CategoriaId.Value, DateTime.Now,
                        p.Imagem, new Dimensoes(p.Altura, p.Largura, p.Profundidade)));

            CreateMap<ProdutoUpdateRequest, Domain.Produto>()
               .ConstructUsing(p =>
                   new Domain.Produto(p.Nome, p.Descricao, true,
                       p.Valor, p.CategoriaId, DateTime.Now,
                       p.Imagem, new Dimensoes(p.Altura, p.Largura, p.Profundidade)));

            CreateMap<CategoriaRequest, Categoria>()
                .ConstructUsing(c => new Categoria(c.Nome, c.Codigo));
        }
    }
}
