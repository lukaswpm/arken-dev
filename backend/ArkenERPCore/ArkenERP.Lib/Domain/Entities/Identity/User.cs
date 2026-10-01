using ArkenERP.Lib.Domain.Entities.Base;

namespace ArkenERP.Lib.Domain.Entities.Identity
{
    public class User : AuditableEntity
    {
        public string Email { get; private set; } = string.Empty;

        public string Username { get; private set; } = string.Empty;

        public string PasswordHash { get; private set; } = string.Empty;

        public string? FirstName { get; private set; }

        public string? LastName { get; private set; }

        public string? AvatarUrl { get; private set; }

        public DateTime? EmailVerifiedAt { get; private set; }

        public DateTime? LastLoginAt { get; private set; }

        public bool IsActive { get; private set; } = true;

        public virtual ICollection<TenantUser> Tenants { get; private set; } = new List<TenantUser>();

        private User() { }

        public static User Create(
            string email,
            string username,
            string passwordHash)
        {
            return new User
            {
                Email = email,
                Username = username,
                PasswordHash = passwordHash
            };
        }
    }
}
