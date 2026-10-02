using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArkenERP.Lib.Domain.Runtime.Website
{
    public sealed class WebsiteComponent
    {
        public string Type { get; set; } = string.Empty;

        public string Id { get; set; } = Guid.NewGuid().ToString();

        public Dictionary<string, object>? Props { get; set; }

        public List<WebsiteComponent>? Children { get; set; }
    }
}
