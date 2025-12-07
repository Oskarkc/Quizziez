using System.ComponentModel.DataAnnotations;

namespace QuizziezAPI.Models;

public class User
{
    [Key] public int Id { get; set; }
    [Required, EmailAddress] public string Email { get; set; } = null!;
    [Required] public string Password { get; set; } = null!;

    public virtual ICollection<Quiz> Quizzes { get; set; } = null!;
}