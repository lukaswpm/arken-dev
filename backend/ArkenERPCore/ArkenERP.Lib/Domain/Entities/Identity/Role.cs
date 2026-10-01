using ArkenERP.Lib.Domain.Entities.Base;

namespace ArkenERP.Lib.Domain.Entities.Identity
{
    public class Role : TenantEntity
    {
        public string Name { get; private set; } = string.Empty;

        public bool IsSystem { get; private set; }

        public virtual ICollection<RolePermission> Permissions { get; private set; } = new List<RolePermission>();

        private Role() { }
    }
}
