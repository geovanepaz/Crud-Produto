using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Produto.Application.ViewModels.BadRequest;
using Produto.Domain.DomainObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace API.Filters
{
    public class ApiExceptionFilter : Attribute, IExceptionFilter
    {

        public void OnException(ExceptionContext context)
        {
            if (!(context.Exception is Exception))
            {
                return;
            }

            switch (context.Exception)
            {

                case DomainException e:
                    context.Result = new ObjectResult(new BadRequest(e.Message)) { StatusCode = (int)HttpStatusCode.BadRequest };

                    break;

                case NotFoundException e:

                    context.Result = new ObjectResult("") { StatusCode = (int)HttpStatusCode.NotFound };

                    break;


                case Exception e:

                    context.Result = new ObjectResult(new { Message = $"Ocorreu uma instabilidade no sistema, mas já estamos resolvendo. {e.Message}" }) { StatusCode = (int)HttpStatusCode.InternalServerError };

                    break;
            }

            context.Exception = null;
        }
    }
}
