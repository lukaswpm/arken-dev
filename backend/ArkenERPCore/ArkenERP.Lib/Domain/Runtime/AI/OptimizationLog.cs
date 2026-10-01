using ArkenERP.Lib.Domain.Entities.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArkenERP.Lib.Domain.Runtime.AI
{
    public class OptimizationLog : Entity
    {
        public Guid TenantId { get; private set; }

        public string TargetEntityType { get; private set; } = string.Empty;

        public Guid TargetEntityId { get; private set; }

        public string ChangeDescription { get; private set; } = string.Empty;

        public string? MetricImproved { get; private set; }

        public decimal? ImprovementDelta { get; private set; }

        public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;

        private OptimizationLog() { }

        public static OptimizationLog Create(Guid tenantId, string targetEntityType, Guid targetEntityId, string changeDescription, string? metricImproved = null, decimal? delta = null)
        {
            return new OptimizationLog
            {
                TenantId = tenantId,
                TargetEntityType = targetEntityType,
                TargetEntityId = targetEntityId,
                ChangeDescription = changeDescription,
                MetricImproved = metricImproved,
                ImprovementDelta = delta
            };
        }
    }
}
