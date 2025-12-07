using Microsoft.EntityFrameworkCore;
using QuizziezAPI.Models;

namespace QuizziezAPI.Data;

public class AppDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Quiz> Quizzes { get; set; }
    public DbSet<Question> Questions { get; set; }
    public DbSet<Answer> Answers { get; set; }
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    
}