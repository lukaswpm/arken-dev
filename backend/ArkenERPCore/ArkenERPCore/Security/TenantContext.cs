using ArkenERP.Lib.Context;

namespace ArkenERP.Core.Security
{
    public class TenantContext : ITenantContext
    {
        public Guid TenantId { get; private set; }
        public bool IsAuthenticated => TenantId != Guid.Empty;

        public void SetTenantId(Guid tenantId)
        {
            if (IsAuthenticated)
                throw new InvalidOperationException("Violação: Tenant já definido neste escopo.");

            if (tenantId == Guid.Empty)
                throw new ArgumentException("TenantId inválido.");

            TenantId = tenantId;
        }
    }
}
