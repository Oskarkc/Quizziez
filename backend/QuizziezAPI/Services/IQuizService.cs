using Microsoft.AspNetCore.Mvc;
using QuizziezAPI.DTO_s;

namespace QuizziezAPI.Services;

public interface IQuizService
{
    public Task<IEnumerable<QuizzezDto>> GetQuizzesAsync();
}