using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuizziezAPI.Migrations
{
    /// <inheritdoc />
    public partial class QuizAttemptsAdjustments : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "QuizTitle",
                table: "QuizAttempts",
                type: "nvarchar(300)",
                maxLength: 300,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "QuizTitle",
                table: "QuizAttempts");
        }
    }
}
