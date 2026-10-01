using ArkenERP.Lib.Context;
using ArkenERP.Lib.Domain.Entities.Base;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace ArkenERP.Core.Services
{

    public class TenantSaveChangesInterceptor : SaveChangesInterceptor
    {
        // Não precisamos mais de construtor injetando serviços de escopo aqui!

        public override InterceptionResult<int> SavingChanges(DbContextEventData eventData, InterceptionResult<int> result)
        {
            ApplyTenantId(eventData.Context);
            return base.SavingChanges(eventData, result);
        }

        public override ValueTask<InterceptionResult<int>> SavingChangesAsync(DbContextEventData eventData, InterceptionResult<int> result, CancellationToken cancellationToken = default)
        {
            ApplyTenantId(eventData.Context);
            return base.SavingChangesAsync(eventData, result, cancellationToken);
        }

        private void ApplyTenantId(DbContext? context)
        {
            if (context == null) return;

            // 1. A Mágica: Verificamos se este contexto implementa a nossa interface
            if (context is not ITenantDbContext tenantDb)
                return; // Se não for (ex: RuntimeDbContext), apenas ignora.

            var tenantId = tenantDb.CurrentTenantId;

            // Se estiver zerado (não autenticado), não fazemos nada
            if (tenantId == Guid.Empty) return;

            var entries = context.ChangeTracker.Entries<TenantEntity>()
                                 .Where(e => e.State == EntityState.Added);

            foreach (var entry in entries)
            {
                if (entry.Entity.TenantId == Guid.Empty)
                {
                    entry.Entity.TenantId = tenantId;
                }
            }
        }
    }
}
