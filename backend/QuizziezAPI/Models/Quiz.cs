using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuizziezAPI.Models;

public class Quiz
{
    [Key]
    public int Id { get; set; }
    [Required , MaxLength(100)]
    public string Name { get; set; } = null!;
    public string UserId { get; set; } = null!;
    public int? DifficultyId { get; set; } 
    public int? CategoryId { get; set; }
    
    [ForeignKey("UserId")]
    public virtual AppUser AppUser { get; set; } = null!;
    
    [ForeignKey("DifficultyId")]
    public virtual Difficulty Difficulty { get; set; } = null!;
    
    [ForeignKey("CategoryId")]
    public virtual Category Category { get; set; } = null!;

    public virtual ICollection<Question> Questions { get; set; } = new List<Question>();
    
    public virtual ICollection<QuizAttempt> QuizAttempts { get; set; } = new List<QuizAttempt>();
}