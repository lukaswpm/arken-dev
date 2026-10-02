using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArkenERP.Lib.Data.Migrations.Runtime
{
    /// <inheritdoc />
    public partial class AddAvatarUrlToClient : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "avatar_url",
                schema: "arken_runtime",
                table: "clients",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "avatar_url",
                schema: "arken_runtime",
                table: "clients");
        }
    }
}
