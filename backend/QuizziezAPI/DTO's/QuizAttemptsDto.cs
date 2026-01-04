namespace QuizziezAPI.DTO_s;

public class QuizAttemptsDto
{
    public int Id { get; set; }
    public int QuizId { get; set; }
    public String QuizTitle { get; set; } = null!;
    public int Score { get; set; }
    public DateTime PlayedAt { get; set; }
}