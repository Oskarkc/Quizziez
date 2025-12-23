namespace QuizziezAPI.DTO_s;

public class EditQuizDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Category { get; set; } = null!;
    public string Difficulty { get; set; } = null!;
    public ICollection<EditQuestionDto> Questions { get; set; } = null!;
}

public class EditQuestionDto
{
    public int Id { get; set; }
    public string Question { get; set; } = null!;
    public ICollection<EditAnswerDto> Answers { get; set; } = null!;
}

public class EditAnswerDto
{
    public int Id { get; set; }
    public string Answer { get; set; } = null!;
    public bool IsCorrectAnswer { get; set; }
}