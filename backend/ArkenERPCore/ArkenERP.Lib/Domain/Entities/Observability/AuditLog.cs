using ArkenERP.Lib.Domain.Entities.Identity;
using ArkenERP.Lib.Domain.Entities.Tenancy;

namespace ArkenERP.Lib.Domain.Entities.Observability
{
    public class AuditLog
    {
        // BIGINT AUTO_INCREMENT no MySQL
        public long Id { get; private set; }

        public Guid? TenantId { get; private set; }

        public Guid? UserId { get; private set; }

        public string Action { get; private set; } = string.Empty;

        public string EntityType { get; private set; } = string.Empty;

        public Guid? EntityId { get; private set; }

        public string? IpAddress { get; private set; }

        public string? UserAgent { get; private set; }

        public string? PayloadJson { get; private set; }

        public DateTime CreatedAt { get; private set; }

        public Tenant? Tenant { get; private set; }

        public User? User { get; private set; }

        private AuditLog() { }
    }
}
