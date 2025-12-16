using System.ComponentModel.DataAnnotations;

namespace QuizziezAPI.Models;

public class Category
{
    [Key]
    public int Id { get; set; }
    [Required, MaxLength(50)]
    public string Name { get; set; } = null!;
    
    public virtual ICollection<Quiz> Quizzes { get; set; } = new HashSet<Quiz>();
}