using ArkenERP.Lib.Domain.Entities.Base;

namespace ArkenERP.Lib.Domain.Entities.Identity
{
    public class RolePermission : AuditableEntity
    {
        public Guid RoleId { get; private set; }

        public string PermissionKey { get; private set; } = string.Empty;

        public virtual Role Role { get; private set; } = null!;

        private RolePermission() { }
    }
}
