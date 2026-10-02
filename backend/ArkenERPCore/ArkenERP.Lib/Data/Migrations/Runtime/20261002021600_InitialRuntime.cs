using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ArkenERP.Lib.Data.Migrations.Runtime
{
    /// <inheritdoc />
    public partial class InitialRuntime : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "arken_runtime");

            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:Enum:arken_runtime.execution_status", "pending,running,completed,failed,canceled")
                .Annotation("Npgsql:PostgresExtension:vector", ",,");

            migrationBuilder.CreateTable(
                name: "ai_agents",
                schema: "arken_runtime",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "text", nullable: false),
                    description = table.Column<string>(type: "text", nullable: false),
                    model_provider = table.Column<string>(type: "text", nullable: false),
                    model_name = table.Column<string>(type: "text", nullable: false),
                    system_prompt = table.Column<string>(type: "text", nullable: false),
                    temperature = table.Column<decimal>(type: "numeric", nullable: false),
                    memory_enabled = table.Column<bool>(type: "boolean", nullable: false),
                    is_active = table.Column<bool>(type: "boolean", nullable: false),
                    config_json = table.Column<string>(type: "text", nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("p_k_ai_agents", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "ai_conversations",
                schema: "arken_runtime",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    agent_id = table.Column<Guid>(type: "uuid", nullable: false),
                    channel = table.Column<string>(type: "text", nullable: false),
                    external_user_id = table.Column<string>(type: "text", nullable: true),
                    status = table.Column<string>(type: "text", nullable: false),
                    metadata_json = table.Column<string>(type: "text", nullable: true),
                    started_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ended_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("p_k_ai_conversations", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "ai_memories",
                schema: "arken_runtime",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    agent_id = table.Column<Guid>(type: "uuid", nullable: false),
                    memory_type = table.Column<string>(type: "text", nullable: false),
                    content = table.Column<string>(type: "text", nullable: false),
                    embedding = table.Column<float[]>(type: "real[]", nullable: false),
                    metadata_json = table.Column<string>(type: "text", nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("p_k_ai_memories", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "business_insights",
                schema: "arken_runtime",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    tenant_id = table.Column<Guid>(type: "uuid", nullable: false),
                    type = table.Column<int>(type: "integer", nullable: false),
                    priority = table.Column<int>(type: "integer", nullable: false),
                    title = table.Column<string>(type: "text", nullable: false),
                    description = table.Column<string>(type: "text", nullable: false),
                    action_payload_json = table.Column<string>(type: "text", nullable: false),
                    status = table.Column<int>(type: "integer", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("p_k_business_insights", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "clients",
                schema: "arken_runtime",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "text", nullable: false),
                    surname = table.Column<string>(type: "text", nullable: false),
                    email = table.Column<string>(type: "text", nullable: false),
                    phone = table.Column<string>(type: "text", nullable: false),
                    document = table.Column<string>(type: "text", nullable: false),
                    address = table.Column<string>(type: "text", nullable: false),
                    city = table.Column<string>(type: "text", nullable: false),
                    state = table.Column<string>(type: "text", nullable: false),
                    status = table.Column<int>(type: "integer", nullable: false),
                    created_by = table.Column<Guid>(type: "uuid", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_by = table.Column<Guid>(type: "uuid", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("p_k_clients", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "dashboards",
                schema: "arken_runtime",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    tenant_id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "text", nullable: false),
                    description = table.Column<string>(type: "text", nullable: true),
                    layout_json = table.Column<string>(type: "text", nullable: false),
                    is_favorite = table.Column<bool>(type: "boolean", nullable: false),
                    created_by = table.Column<Guid>(type: "uuid", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_by = table.Column<Guid>(type: "uuid", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("p_k_dashboards", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "entities_registry",
                schema: "arken_runtime",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    tenant_id = table.Column<Guid>(type: "uuid", nullable: false),
                    entity_type = table.Column<string>(type: "text", nullable: false),
                    entity_id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "text", nullable: false),
                    metadata_json = table.Column<string>(type: "text", nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("p_k_entities_registry", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "files",
                schema: "arken_runtime",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    tenant_id = table.Column<Guid>(type: "uuid", nullable: false),
                    file_name = table.Column<string>(type: "text", nullable: false),
                    storage_provider = table.Column<string>(type: "text", nullable: false),
                    path = table.Column<string>(type: "text", nullable: false),
                    mime_type = table.Column<string>(type: "text", nullable: false),
                    size = table.Column<long>(type: "bigint", nullable: false),
                    embedding = table.Column<float[]>(type: "real[]", nullable: true),
                    metadata_json = table.Column<string>(type: "text", nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("p_k_files", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "optimization_logs",
                schema: "arken_runtime",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    tenant_id = table.Column<Guid>(type: "uuid", nullable: false),
                    target_entity_type = table.Column<string>(type: "text", nullable: false),
                    target_entity_id = table.Column<Guid>(type: "uuid", nullable: false),
                    change_description = table.Column<string>(type: "text", nullable: false),
                    metric_improved = table.Column<string>(type: "text", nullable: true),
                    improvement_delta = table.Column<decimal>(type: "numeric", nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("p_k_optimization_logs", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "product_categories",
                schema: "arken_runtime",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "text", nullable: false),
                    description = table.Column<string>(type: "text", nullable: false),
                    created_by = table.Column<Guid>(type: "uuid", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_by = table.Column<Guid>(type: "uuid", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("p_k_product_categories", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "ai_messages",
                schema: "arken_runtime",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    conversation_id = table.Column<Guid>(type: "uuid", nullable: false),
                    sender_type = table.Column<string>(type: "text", nullable: false),
                    message = table.Column<string>(type: "text", nullable: false),
                    tokens_input = table.Column<int>(type: "integer", nullable: false),
                    tokens_output = table.Column<int>(type: "integer", nullable: false),
                    metadata_json = table.Column<string>(type: "text", nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("p_k_ai_messages", x => x.id);
                    table.ForeignKey(
                        name: "f_k_ai_messages_ai_conversations_conversation_id",
                        column: x => x.conversation_id,
                        principalSchema: "arken_runtime",
                        principalTable: "ai_conversations",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "orders",
                schema: "arken_runtime",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    order_number = table.Column<string>(type: "text", nullable: false),
                    client_id = table.Column<Guid>(type: "uuid", nullable: false),
                    order_date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    total_amount = table.Column<decimal>(type: "numeric", nullable: false),
                    items_count = table.Column<int>(type: "integer", nullable: false),
                    status = table.Column<string>(type: "text", nullable: false),
                    created_by = table.Column<Guid>(type: "uuid", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_by = table.Column<Guid>(type: "uuid", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("p_k_orders", x => x.id);
                    table.ForeignKey(
                        name: "f_k_orders_clients_client_id",
                        column: x => x.client_id,
                        principalSchema: "arken_runtime",
                        principalTable: "clients",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "dashboard_visuals",
                schema: "arken_runtime",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    tenant_id = table.Column<Guid>(type: "uuid", nullable: false),
                    dashboard_id = table.Column<Guid>(type: "uuid", nullable: false),
                    title = table.Column<string>(type: "text", nullable: true),
                    type = table.Column<int>(type: "integer", nullable: false),
                    data_query_sql = table.Column<string>(type: "text", nullable: false),
                    config_json = table.Column<string>(type: "text", nullable: false),
                    refresh_interval_seconds = table.Column<int>(type: "integer", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("p_k_dashboard_visuals", x => x.id);
                    table.ForeignKey(
                        name: "f_k_dashboard_visuals_dashboards_dashboard_id",
                        column: x => x.dashboard_id,
                        principalSchema: "arken_runtime",
                        principalTable: "dashboards",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "products",
                schema: "arken_runtime",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "text", nullable: false),
                    description = table.Column<string>(type: "text", nullable: false),
                    code = table.Column<string>(type: "text", nullable: false),
                    brand = table.Column<string>(type: "text", nullable: true),
                    model = table.Column<string>(type: "text", nullable: true),
                    color = table.Column<string>(type: "text", nullable: true),
                    size = table.Column<string>(type: "text", nullable: true),
                    material = table.Column<string>(type: "text", nullable: true),
                    weight = table.Column<string>(type: "text", nullable: true),
                    image_url = table.Column<string>(type: "text", nullable: true),
                    price = table.Column<decimal>(type: "numeric", nullable: false),
                    product_category_id = table.Column<Guid>(type: "uuid", nullable: false),
                    stock_quantity = table.Column<int>(type: "integer", nullable: false),
                    status = table.Column<int>(type: "integer", nullable: false),
                    s_k_u = table.Column<string>(type: "text", nullable: false),
                    created_by = table.Column<Guid>(type: "uuid", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_by = table.Column<Guid>(type: "uuid", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("p_k_products", x => x.id);
                    table.ForeignKey(
                        name: "f_k_products__product_categories_product_category_id",
                        column: x => x.product_category_id,
                        principalSchema: "arken_runtime",
                        principalTable: "product_categories",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "i_x_ai_messages_conversation_id",
                schema: "arken_runtime",
                table: "ai_messages",
                column: "conversation_id");

            migrationBuilder.CreateIndex(
                name: "i_x_dashboard_visuals_dashboard_id",
                schema: "arken_runtime",
                table: "dashboard_visuals",
                column: "dashboard_id");

            migrationBuilder.CreateIndex(
                name: "i_x_orders_client_id",
                schema: "arken_runtime",
                table: "orders",
                column: "client_id");

            migrationBuilder.CreateIndex(
                name: "i_x_products_product_category_id",
                schema: "arken_runtime",
                table: "products",
                column: "product_category_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ai_agents",
                schema: "arken_runtime");

            migrationBuilder.DropTable(
                name: "ai_memories",
                schema: "arken_runtime");

            migrationBuilder.DropTable(
                name: "ai_messages",
                schema: "arken_runtime");

            migrationBuilder.DropTable(
                name: "business_insights",
                schema: "arken_runtime");

            migrationBuilder.DropTable(
                name: "dashboard_visuals",
                schema: "arken_runtime");

            migrationBuilder.DropTable(
                name: "entities_registry",
                schema: "arken_runtime");

            migrationBuilder.DropTable(
                name: "files",
                schema: "arken_runtime");

            migrationBuilder.DropTable(
                name: "optimization_logs",
                schema: "arken_runtime");

            migrationBuilder.DropTable(
                name: "orders",
                schema: "arken_runtime");

            migrationBuilder.DropTable(
                name: "products",
                schema: "arken_runtime");

            migrationBuilder.DropTable(
                name: "ai_conversations",
                schema: "arken_runtime");

            migrationBuilder.DropTable(
                name: "dashboards",
                schema: "arken_runtime");

            migrationBuilder.DropTable(
                name: "clients",
                schema: "arken_runtime");

            migrationBuilder.DropTable(
                name: "product_categories",
                schema: "arken_runtime");
        }
    }
}
