using FluentValidation;

namespace Produto.Application.ViewModels.Produto
{
    public class CategoriaRequest
    {
        public string Nome { get; set; }

        public int Codigo { get; set; }
    }

    public class CategoriaValidator : AbstractValidator<CategoriaRequest>
    {
        public CategoriaValidator()
        {
            RuleFor(o => o.Nome)
                .NotEmpty().WithMessage("O campo {PropertyName} é obrigatório");

            RuleFor(o => o.Codigo)
                .GreaterThan(0).WithMessage("O campo {PropertyName} deve ser maior que zero.");
        }
    }
}
