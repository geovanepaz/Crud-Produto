using FluentValidation;

namespace Core.ViewModels.Login
{
    public class LoginRequest
    {
        public string Email { get; set; }
        public string Senha { get; set; }
    }

    public class LoginValidator : AbstractValidator<LoginRequest>
    {
        public LoginValidator()
        {
            RuleFor(o => o.Senha)
                .NotEmpty().WithMessage("{PropertyName} é obrigatória");

            RuleFor(o => o.Email)
                .EmailAddress().WithMessage("{PropertyName} inválido");
        }
    }
}
