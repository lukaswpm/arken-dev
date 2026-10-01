using ArkenERP.Lib.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ArkenERP.Lib.Domain.Entities.Base;

namespace ArkenERP.Lib.Domain.Runtime.AI
{
    public class BusinessInsight : Entity
    {
        public Guid TenantId { get; private set; }

        public InsightType Type { get; private set; }

        public InsightPriority Priority { get; private set; } = InsightPriority.Medium;

        public string Title { get; private set; } = string.Empty;

        public string Description { get; private set; } = string.Empty;

        public string ActionPayloadJson { get; private set; } = "{}";

        public InsightStatus Status { get; private set; } = InsightStatus.Pending;

        public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;

        private BusinessInsight() { }

        public static BusinessInsight Create(Guid tenantId, InsightType type, string title, string description, InsightPriority priority = InsightPriority.Medium)
        {
            return new BusinessInsight
            {
                TenantId = tenantId,
                Type = type,
                Title = title,
                Description = description,
                Priority = priority
            };
        }

        public void MarkAsApplied()
        {
            Status = InsightStatus.Applied;
        }

        public void Dismiss()
        {
            Status = InsightStatus.Dismissed;
        }
    }
}
