using ArkenERP.Lib.Domain.Entities.ERP;
using ArkenERP.Lib.Domain.Runtime;
using ArkenERP.Lib.Domain.Runtime.AI;
using ArkenERP.Lib.Domain.Runtime.BI;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace ArkenERP.Lib.Context
{
    public class RuntimeDbContext : DbContext
    {
        public RuntimeDbContext(
            DbContextOptions<RuntimeDbContext> options
        ) : base(options)
        {
            // Garante que o driver saiba onde encontrar o Enum no esquema customizado
            //Npgsql.NpgsqlConnection.GlobalTypeMapper.MapEnum<ExecutionStatus>("arken_runtime.execution_status");
        }

        // =========================================================
        // AI
        // =========================================================

        public DbSet<AiAgent> AiAgents => Set<AiAgent>();

        public DbSet<AiConversation> AiConversations
            => Set<AiConversation>();

        public DbSet<AiMessage> AiMessages
            => Set<AiMessage>();

        public DbSet<AiMemory> AiMemories
            => Set<AiMemory>();

        // =========================================================
        // FILES
        // =========================================================

        public DbSet<FileEntity> Files
            => Set<FileEntity>();

        // =========================================================
        // REGISTRY
        // =========================================================

        public DbSet<EntitiesRegistry> EntitiesRegistry
            => Set<EntitiesRegistry>();

        // =========================================================
        // BI & DASHBOARDS
        // =========================================================

        public DbSet<Dashboard> Dashboards
            => Set<Dashboard>();

        public DbSet<DashboardVisual> DashboardVisuals
            => Set<DashboardVisual>();

        // =========================================================
        // AI CEO MODE (INSIGHTS & OPTIMIZATION)
        // =========================================================

        public DbSet<BusinessInsight> BusinessInsights
            => Set<BusinessInsight>();

        public DbSet<OptimizationLog> OptimizationLogs
            => Set<OptimizationLog>();

        // ========================================================= ERP =========================================================
        public DbSet<Client> Clients => Set<Client>();
        public DbSet<Product> Products => Set<Product>();
        public DbSet<ProductCategory> ProductCategories => Set<ProductCategory>();
        public DbSet<Orders> Orders => Set<Orders>();


        protected override void OnModelCreating(
            ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.HasPostgresEnum("arken_runtime", "execution_status",
        new[] { "pending", "running", "completed", "failed", "canceled" });

            // =====================================================
            // EXTENSIONS
            // =====================================================

            modelBuilder.HasPostgresExtension("vector");

            // =====================================================
            // DEFAULT SCHEMA
            // =====================================================

            modelBuilder.HasDefaultSchema("arken_runtime");

            // =====================================================
            // CONFIGURATIONS
            // =====================================================

            modelBuilder.ApplyConfigurationsFromAssembly(
                typeof(RuntimeDbContext).Assembly,
                type => type.Namespace != null && type.Namespace.Contains("Configurations.Runtime")
            );

            // =====================================================
            // SNAKE CASE GLOBAL
            // =====================================================

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
        private static string ToSnakeCase(string text)
        {
            if (string.IsNullOrWhiteSpace(text))
                return text;

            var builder = new System.Text.StringBuilder();

            for (int i = 0; i < text.Length; i++)
            {
                var c = text[i];

                if (char.IsUpper(c))
                {
                    if (i > 0)
                        builder.Append('_');

                    builder.Append(char.ToLowerInvariant(c));
                }
                else
                {
                    builder.Append(c);
                }
            }

            return builder.ToString();
        }
    }
}
