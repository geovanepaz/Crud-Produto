﻿using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace Produto.Domain.DomainObjects
{
    public class NotFoundException : Exception
    {
        public readonly object Arguments;

        public NotFoundException()
        {
        }

        public NotFoundException(string message) : base(message)
        {
        }

        public NotFoundException(string message, Exception innerException) : base(message, innerException)
        {
        }

        public NotFoundException(string message, object arguments = null) : base(message) => Arguments = arguments;

        public NotFoundException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}
