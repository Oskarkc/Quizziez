namespace QuizziezAPI.Exceptions;

public class InvalidEmailException: Exception
{
    public InvalidEmailException() : base("Invalid email address")
    {}
}