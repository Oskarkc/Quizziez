using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuizziezAPI.Models;

public class Question
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string QuestionText { get; set; } = null!;
    public int QuizId { get; set; }
    
    [ForeignKey("QuizId")] 
    public virtual Quiz Quiz { get; set; } = null!;
    
    public virtual ICollection<Answer> Answers { get; set; } = null!;
}