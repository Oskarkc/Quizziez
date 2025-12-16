namespace QuizziezAPI.Exceptions;

public class QuizValidationException : Exception
{
    public QuizValidationException(string message)
        : base(message)
    {
    }
}
