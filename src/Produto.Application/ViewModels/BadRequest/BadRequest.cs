using System;
using System.Collections.Generic;
using System.Text;

namespace Produto.Application.ViewModels.BadRequest
{
    public class BadRequest
    {
        public List<String> Error { get; }

        public BadRequest(List<string> error)
        {
            Error = error;
        }

        public BadRequest(string error)
        {
            Error = new List<string> { error };
        }
    }
}
