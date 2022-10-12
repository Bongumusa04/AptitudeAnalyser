using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class CSMarkAdded1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MarkDS",
                table: "Marks");

            migrationBuilder.DropColumn(
                name: "MarkIS",
                table: "Marks");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MarkDS",
                table: "Marks",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "MarkIS",
                table: "Marks",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }
    }
}
