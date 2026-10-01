using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArkenAPI.Domain.Runtime.Website
{
    public sealed class WebsiteThemeConfig
    {
        public string PrimaryColor { get; set; } = "#000000";

        public string SecondaryColor { get; set; } = "#FFFFFF";

        public string FontFamily { get; set; } = "Inter";

        public string BorderRadius { get; set; } = "8px";

        public bool DarkModeEnabled { get; set; }
    }
}
