namespace QuizziezAPI.DTO_s;

public class CreateQuizAttemptDto
{
    public String QuizTitle { get; set; } = null!;
    public int Score { get; set; }
}