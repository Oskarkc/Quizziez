namespace QuizziezAPI.DTO_s;

public class CreateQuizDto
{
    public string Name { get; set; } = null!;
    public string Category { get; set; } = null!;
    public string Difficulty { get; set; } = null!;
    public ICollection<CreateQuestionDto> Questions { get; set; } = null!;
}

public class CreateQuestionDto
{
    public string Question { get; set; } = null!;
    public ICollection<CreateAnswerDto> Answers { get; set; } = null!;
}

public class CreateAnswerDto
{
    public string Answer { get; set; } = null!;
    public bool IsCorrectAnswer { get; set; }
}