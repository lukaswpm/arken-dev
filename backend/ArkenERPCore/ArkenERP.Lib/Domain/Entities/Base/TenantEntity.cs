namespace ArkenERP.Lib.Domain.Entities.Base
{
    public abstract class TenantEntity : AuditableEntity
    {
        public Guid TenantId { get; set; }
    }
}
