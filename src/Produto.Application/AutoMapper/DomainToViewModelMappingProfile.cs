using AutoMapper;
using Produto.Application.ViewModels.Produto;
using Produto.Domain;

namespace Produto.Application.AutoMapper
{
    public class DomainToViewModelMappingProfile : Profile
    {
        public DomainToViewModelMappingProfile()
        {
            CreateMap<Domain.Produto, ProdutoRequest>()
                .ForMember(d => d.Largura, o => o.MapFrom(s => s.Dimensoes.Largura))
                .ForMember(d => d.Altura, o => o.MapFrom(s => s.Dimensoes.Altura))
                .ForMember(d => d.Profundidade, o => o.MapFrom(s => s.Dimensoes.Profundidade));

            CreateMap<Domain.Produto, ProdutoResponse>()
               .ForMember(d => d.Largura, o => o.MapFrom(s => s.Dimensoes.Largura))
               .ForMember(d => d.Altura, o => o.MapFrom(s => s.Dimensoes.Altura))
               .ForMember(d => d.Profundidade, o => o.MapFrom(s => s.Dimensoes.Profundidade));

            CreateMap<Categoria, CategoriaRequest>();
            CreateMap<Categoria, CategoriaResponse>();
        }
    }
}
