namespace ArkenERP.Lib.Domain.Entities.Base
{
    public class AuditableEntity: Entity
    {
        public Guid CreatedBy { get; protected set; } = Guid.Empty;
        public DateTime CreatedAt { get; protected set; } = DateTime.UtcNow;

        public Guid UpdatedBy { get; protected set; } = Guid.Empty;
        public DateTime UpdatedAt { get; protected set; } = DateTime.UtcNow;
    }
}
