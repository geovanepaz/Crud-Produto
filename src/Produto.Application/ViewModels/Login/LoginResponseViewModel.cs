using System;
using System.Collections.Generic;
using System.Text;

namespace Core.ViewModels.Login
{
    public class LoginResponseViewModel
    {
        public string AccessToken { get; set; }
        public double ExpiresIn { get; set; }
    }
}
