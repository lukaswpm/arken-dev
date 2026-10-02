using ArkenERP.Lib.Domain.Entities.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArkenERP.Lib.Domain.Runtime.Website
{
    public sealed class Website : Entity
    {
        public Guid TenantId { get; private set; }

        public string Name { get; private set; } = string.Empty;

        public string? CustomDomain { get; private set; }

        public WebsiteThemeConfig? ThemeConfigJson { get; private set; }

        public bool IsPublished { get; private set; }

        public DateTime CreatedAt { get; private set; }

        public DateTime UpdatedAt { get; private set; }

        // Navigation
        public ICollection<WebsitePage> Pages { get; private set; }
            = new List<WebsitePage>();

        private Website() { }

        public Website(
            Guid tenantId,
            string name,
            string? customDomain,
            WebsiteThemeConfig? themeConfigJson
        )
        {
            TenantId = tenantId;
            Name = name;
            CustomDomain = customDomain;
            ThemeConfigJson = themeConfigJson;

            IsPublished = false;

            CreatedAt = DateTime.UtcNow;
            UpdatedAt = DateTime.UtcNow;
        }

        public void Publish()
        {
            IsPublished = true;
            UpdatedAt = DateTime.UtcNow;
        }

        public void Unpublish()
        {
            IsPublished = false;
            UpdatedAt = DateTime.UtcNow;
        }

        public void UpdateTheme(WebsiteThemeConfig config)
        {
            ThemeConfigJson = config;
            UpdatedAt = DateTime.UtcNow;
        }
    }
}
