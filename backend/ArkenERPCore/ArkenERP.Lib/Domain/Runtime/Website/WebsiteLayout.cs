using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArkenAPI.Domain.Runtime.Website
{
    public sealed class WebsiteLayout
    {
        public List<WebsiteComponent> Components { get; set; }
            = new();
    }
}
