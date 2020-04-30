using FluentValidation;
using System;

namespace Produto.Application.ViewModels.Produto
{
    public class ProdutoResponse
    {
        public Guid Id { get; set; }
        public Guid CategoriaId { get; set; }

        public string Nome { get; set; }

        public string Descricao { get; set; }

        public bool Ativo { get; set; }

        public decimal Valor { get; set; }

        public DateTime DataCadastro { get; set; }

        public string Imagem { get; set; }
        public byte[] ImagemByte { get; set; }

        public int QuantidadeEstoque { get; set; }

        public int Altura { get; set; }

        public int Largura { get; set; }

        public int Profundidade { get; set; }
    }
}
