namespace QuizziezAPI.Exceptions;

public class RegistrationException : Exception
{
    public RegistrationException() : base("Cannot register user")
    {
    }
}
