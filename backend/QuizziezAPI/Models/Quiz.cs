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
    
    [ForeignKey("UserId")]
    public virtual AppUser AppUser { get; set; } = null!;
    
    public virtual ICollection<Question> Questions { get; set; } = null!;
}