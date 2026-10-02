using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArkenERP.Lib.Domain.Runtime.Website
{
    public sealed class SeoMetadata
    {
        public string? Title { get; set; }

        public string? Description { get; set; }

        public string? Keywords { get; set; }

        public string? OpenGraphImage { get; set; }

        public string? CanonicalUrl { get; set; }
    }
}
