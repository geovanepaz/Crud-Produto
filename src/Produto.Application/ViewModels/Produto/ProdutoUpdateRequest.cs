using FluentValidation;
using System;

namespace Produto.Application.ViewModels.Produto
{
    public class ProdutoUpdateRequest
    {
        public Guid? Id { get; set; }
        public Guid CategoriaId { get; set; }

        public string Nome { get; set; }

        public string Descricao { get; set; }

        public bool Ativo { get; set; }

        public decimal Valor { get; set; }

        public string Imagem { get; set; }

        public int QuantidadeEstoque { get; set; }

        public int Altura { get; set; }

        public int Largura { get; set; }

        public int Profundidade { get; set; }
    }

    public class ProdutoUpdateValidator : AbstractValidator<ProdutoUpdateRequest>
    {
        public ProdutoUpdateValidator()
        {
            RuleFor(o => o.Id)
                .NotEmpty().WithMessage("O campo {PropertyName} é obrigatório");

            RuleFor(o => o.CategoriaId)
                .NotEmpty().WithMessage("O campo {PropertyName} é obrigatório");

            RuleFor(o => o.Nome)
                .NotEmpty().WithMessage("O campo {PropertyName} é obrigatório");

            RuleFor(o => o.Descricao)
                .NotEmpty().WithMessage("O campo {PropertyName} é obrigatório");

            RuleFor(o => o.Valor)
                .GreaterThan(0).WithMessage("O campo {PropertyName} deve ser maior que zero.");

            RuleFor(o => o.Imagem)
                .NotEmpty().WithMessage("O campo {PropertyName} é obrigatório");

            RuleFor(o => o.QuantidadeEstoque)
                .GreaterThan(0).WithMessage("O campo {PropertyName} deve ser maior que zero.");

            RuleFor(o => o.Altura)
                .GreaterThan(0).WithMessage("O campo {PropertyName} deve ser maior que zero.");

            RuleFor(o => o.Largura)
                .GreaterThan(0).WithMessage("O campo {PropertyName} deve ser maior que zero.");

            RuleFor(o => o.Profundidade)
                .GreaterThan(0).WithMessage("O campo {PropertyName} deve ser maior que zero.");
        }
    }
}
