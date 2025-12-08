namespace QuizziezAPI.DTO_s;

public class QuizzezDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public ICollection<QuestionDto> Questions { get; set; } = null!;
}

public class QuestionDto
{
    public int Id { get; set; }
    public string Question { get; set; } = null!;
    public ICollection<AnswerDto> Answers { get; set; } = null!;
}

public class AnswerDto
{
    public int Id { get; set; }
    public string Answer { get; set; } = null!;
    public bool IsCorrectAnswer { get; set; }
}