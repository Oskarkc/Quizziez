using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuizziezAPI.Models;

public class QuizAttempt
{
    [Key]
    public int Id { get; set; }
    public string UserId { get; set; } = null!;
    public int QuizId { get; set; } 
    [Required]
    public int Score { get; set; }
    [Required]
    public DateTime PlayedAt { get; set; }
    
    [ForeignKey("UserId")]
    public virtual AppUser User { get; set; } = null!;
    
    [ForeignKey("QuizId")]
    public virtual Quiz Quiz { get; set; } = null!;
}