using FluentValidation;
using System;

namespace Produto.Application.ViewModels.Produto
{
    public class CategoriaResponse
    {
        public Guid Id { get; set; }
        public string Nome { get; set; }
        public int Codigo { get; set; }
    }
}
