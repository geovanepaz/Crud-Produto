using FluentValidation;
using System;
using System.Collections.Generic;

namespace Produto.Application.ViewModels.Produto
{
    public class FiltrarProdutoResponse
    {
        public IEnumerable<ProdutoResponse> Produtos { get; set; }
        public int QuantidadeTotal { get; set; }
        public byte[] Imagem { get; set; }


    }
}
