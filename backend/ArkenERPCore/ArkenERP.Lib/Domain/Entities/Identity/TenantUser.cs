using ArkenERP.Lib.Domain.Entities.Tenancy;
using System.Data;

namespace ArkenERP.Lib.Domain.Entities.Identity
{
    public class TenantUser
    {
        public Guid Id { get; private set; }
        public Guid TenantId { get; private set; }

        public Guid? RoleId { get; private set; }

        public string Status { get; private set; } = "active";

        public Guid? InvitedBy { get; private set; }

        public DateTime? JoinedAt { get; private set; }

        public virtual Tenant Tenant { get; private set; } = null!;

        public virtual User User { get; private set; } = null!;

        public virtual Role? Role { get; private set; }

        private TenantUser() { }
    }
}
