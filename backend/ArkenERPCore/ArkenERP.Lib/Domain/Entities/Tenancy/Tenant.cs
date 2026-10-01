using ArkenERP.Lib.Domain.Entities.Base;
using ArkenERP.Lib.Domain.Entities.Identity;

namespace ArkenERP.Lib.Domain.Entities.Tenancy
{
    public class Tenant: AuditableEntity
    {
        public string CompanyName { get; private set; } = string.Empty;

        public string Slug { get; private set; } = string.Empty;

        public TenantStatus Status { get; private set; } = TenantStatus.Trial;

        public Guid? OwnerUserId { get; private set; }

        public string? StripeCustomerId { get; private set; }

        public DateTime? TrialEndsAt { get; private set; }

        public DateTime? SuspendedAt { get; private set; }

        public DateTime? DeletedAt { get; private set; }

        public TenantSettings? SettingsJson { get; private set; }

        public virtual ICollection<TenantUser> Users { get; private set; } = new List<TenantUser>();


        private Tenant() { }

        public static Tenant Create(string companyName, string slug)
        {
            return new Tenant
            {
                CompanyName = companyName,
                Slug = slug.ToLowerInvariant(),
                Status = TenantStatus.Trial
            };
        }

        public void Activate()
        {
            Status = TenantStatus.Active;
        }

        public void Suspend()
        {
            Status = TenantStatus.Suspended;
            SuspendedAt = DateTime.UtcNow;
        }

    }
}
