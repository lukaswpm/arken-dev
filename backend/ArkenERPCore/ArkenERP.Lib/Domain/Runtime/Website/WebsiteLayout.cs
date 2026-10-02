using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArkenERP.Lib.Domain.Runtime.Website
{
    public sealed class WebsiteLayout
    {
        public List<WebsiteComponent> Components { get; set; }
            = new();
    }
}
