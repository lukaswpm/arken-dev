using ArkenERP.Lib.Domain.Entities.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArkenERP.Lib.Domain.Runtime.Website
{
    public sealed class WebsitePage : Entity
    {
        public Guid TenantId { get; private set; }

        public Guid WebsiteId { get; private set; }

        public string Name { get; private set; } = string.Empty;

        public string Slug { get; private set; } = string.Empty;

        public SeoMetadata? SeoMetadataJson { get; private set; }

        public WebsiteLayout? LayoutJson { get; private set; }

        public bool IsPublished { get; private set; }

        public DateTime CreatedAt { get; private set; }

        public DateTime UpdatedAt { get; private set; }

        // Navigation
        public Website? Website { get; private set; }

        private WebsitePage() { }

        public WebsitePage(
            Guid tenantId,
            Guid websiteId,
            string name,
            string slug,
            WebsiteLayout layout
        )
        {
            TenantId = tenantId;
            WebsiteId = websiteId;
            Name = name;
            Slug = slug;
            LayoutJson = layout;

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

        public void UpdateLayout(WebsiteLayout layout)
        {
            LayoutJson = layout;
            UpdatedAt = DateTime.UtcNow;
        }

        public void UpdateSeo(SeoMetadata seo)
        {
            SeoMetadataJson = seo;
            UpdatedAt = DateTime.UtcNow;
        }
    }
}
