using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuizziezAPI.Models;

public class Answer
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Text { get; set; } = null!;
    [Required]
    public bool IsCorrectAnswer { get; set; }
    public int QuestionId { get; set; }
    
    [ForeignKey("QuestionId")]
    public virtual Question Question { get; set; } = null!;
}