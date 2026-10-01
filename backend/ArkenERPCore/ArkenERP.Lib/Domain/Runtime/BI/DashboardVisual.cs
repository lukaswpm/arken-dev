using ArkenERP.Lib.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ArkenERP.Lib.Domain.Entities.Base;

namespace ArkenERP.Lib.Domain.Runtime.BI
{
    public class DashboardVisual : Entity
    {
        public Guid TenantId { get; private set; }

        public Guid DashboardId { get; private set; }

        public string? Title { get; private set; }

        public ChartType Type { get; private set; }

        public string DataQuerySql { get; private set; } = string.Empty;

        public string ConfigJson { get; private set; } = "{}";

        public int RefreshIntervalSeconds { get; private set; } = 0;

        public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;

        public virtual Dashboard Dashboard { get; private set; } = null!;

        private DashboardVisual() { }

        public static DashboardVisual Create(Guid tenantId, Guid dashboardId, string title, ChartType type, string dataQuerySql, string configJson)
        {
            return new DashboardVisual
            {
                TenantId = tenantId,
                DashboardId = dashboardId,
                Title = title,
                Type = type,
                DataQuerySql = dataQuerySql,
                ConfigJson = configJson
            };
        }
    }
}
