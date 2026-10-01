namespace ArkenERP.Lib.Context
{
    public interface ITenantContext
    {
        Guid TenantId { get; }
        bool IsAuthenticated { get; }
        void SetTenantId(Guid tenantId);
    }
    public interface ITenantDbContext
    {
        Guid CurrentTenantId { get; }
    }
}
