using ArkenERP.Lib.Domain.Entities.ERP;
using ArkenERP.Lib.Domain.Entities.Identity;
using ArkenERP.Lib.Domain.Entities.Tenancy;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace ArkenERP.Lib.Context
{
    public class ManagerDbContext : DbContext, ITenantDbContext
    {
        private readonly ITenantContext _tenantContext;
        public ManagerDbContext(
            DbContextOptions<ManagerDbContext> options
        ) : base(options)
        {
        }
        public ManagerDbContext(DbContextOptions<ManagerDbContext> options, ITenantContext tenantContext) : base(options)
        {
            _tenantContext = tenantContext;
        }

        public Guid CurrentTenantId => _tenantContext?.IsAuthenticated == true ? _tenantContext.TenantId : Guid.Empty;

        public DbSet<Tenant> Tenants => Set<Tenant>();
        public DbSet<TenantUser> TenantUsers => Set<TenantUser>();
        public DbSet<Session> Sessions => Set<Session>();
        public DbSet<User> Users => Set<User>();
        public DbSet<Role> Roles => Set<Role>();
        public DbSet<RolePermission> RolePermissions => Set<RolePermission>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(
                typeof(ManagerDbContext).Assembly,
                type => type.Namespace != null && type.Namespace.Contains("Configurations.Manager")
            );

            ApplySnakeCase(modelBuilder);
        }
        private static void ApplySnakeCase(ModelBuilder modelBuilder)
        {
            foreach (var entity in modelBuilder.Model.GetEntityTypes())
            {
                entity.SetTableName(
                    ToSnakeCase(entity.GetTableName()!)
                );

                foreach (var property in entity.GetProperties())
                {
                    property.SetColumnName(
                        ToSnakeCase(property.Name)
                    );
                }

                foreach (var key in entity.GetKeys())
                {
                    key.SetName(
                        ToSnakeCase(key.GetName()!)
                    );
                }

                foreach (var key in entity.GetForeignKeys())
                {
                    key.SetConstraintName(
                        ToSnakeCase(key.GetConstraintName()!)
                    );
                }

                foreach (var index in entity.GetIndexes())
                {
                    index.SetDatabaseName(
                        ToSnakeCase(index.GetDatabaseName()!)
                    );
                }
            }
        }
        private static string ToSnakeCase(string name)
        {
            if (string.IsNullOrEmpty(name))
                return name;

            var sb = new System.Text.StringBuilder();
            for (int i = 0; i < name.Length; i++)
            {
                var c = name[i];
                if (char.IsUpper(c))
                {
                    if (i > 0) sb.Append('_');
                    sb.Append(char.ToLower(c));
                }
                else
                {
                    sb.Append(c);
                }
            }
            return sb.ToString();
        }
    }
}
