namespace QuizziezAPI.DTO_s;

public class QuizOptionsDto
{
    public ICollection<DifficultyDto> Difficulties { get; set; } = null!;
    public ICollection<CategoryDto> Categories { get; set; } = null!;
}

public class DifficultyDto
{
    public string Name { get; set; } = null!;
}

public class CategoryDto
{
    public string Name { get; set; } = null!;
}