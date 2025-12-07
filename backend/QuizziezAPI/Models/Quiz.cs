using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuizziezAPI.Models;

public class Quiz
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Name { get; set; } = null!;
    public int UserId { get; set; }
    
    [ForeignKey("UserId")]
    public virtual User User { get; set; } = null!;
    
    public virtual ICollection<Question> Questions { get; set; } = null!;
}