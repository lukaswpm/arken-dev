using ArkenERP.Lib.Domain.Entities.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArkenERP.Lib.Domain.Runtime.BI
{
    public class Dashboard : AuditableEntity
    {
        public Guid TenantId { get; private set; }

        public string Name { get; private set; } = string.Empty;

        public string? Description { get; private set; }

        // Mapeado para JSONB. Usando string para facilitar o parsing do React Grid Layout
        public string LayoutJson { get; private set; } = "[]";

        public bool IsFavorite { get; private set; } = false;

        public virtual ICollection<DashboardVisual> Visuals { get; private set; } = new List<DashboardVisual>();

        private Dashboard() { }

        public static Dashboard Create(Guid tenantId, string name, string? description = null)
        {
            return new Dashboard
            {
                TenantId = tenantId,
                Name = name,
                Description = description,
                LayoutJson = "[]"
            };
        }

        public void UpdateLayout(string newLayoutJson)
        {
            LayoutJson = newLayoutJson;
        }

        public void ToggleFavorite()
        {
            IsFavorite = !IsFavorite;
        }
    }
}
