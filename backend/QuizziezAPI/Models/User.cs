using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace QuizziezAPI.Models;

public class AppUser : IdentityUser
{
    public string? RefreshToken { get; set; }         
    public DateTime? RefreshTokenExpiryTime { get; set; }
    public virtual ICollection<Quiz> Quizzes { get; set; } = null!;
}