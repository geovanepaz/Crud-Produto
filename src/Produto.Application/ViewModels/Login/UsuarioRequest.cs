using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.ViewModels.Login
{
    public class UsuarioRequest
    {
        public string Email { get; set; }
        public string Senha { get; set; }
    }

    public class UsuarioValidator : AbstractValidator<UsuarioRequest>
    {
        public UsuarioValidator()
        {
            RuleFor(o => o.Email)
                .EmailAddress().WithMessage("{PropertyName} inválido");

            RuleFor(o => o.Senha)
                .NotEmpty().WithMessage("{PropertyName} é obrigatória");
        }
    }
}
