using ArkenERP.Lib.Domain.Entities.Base;

namespace ArkenERP.Lib.Domain.Entities.Identity
{
    public class Role : TenantEntity
    {
        public string Name { get; private set; } = string.Empty;

        public bool IsSystem { get; private set; }

        public virtual ICollection<RolePermission> Permissions { get; private set; } = new List<RolePermission>();

        private Role() { }

        public static Role Create(string name, Guid tenantId, bool isSystem = false)
        {
            var role = new Role
            {
                Name = name,
                TenantId = tenantId,
                IsSystem = isSystem,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
            return role;
        }
    }
}
