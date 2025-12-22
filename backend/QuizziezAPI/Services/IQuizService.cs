using Microsoft.AspNetCore.Mvc;
using QuizziezAPI.DTO_s;

namespace QuizziezAPI.Services;

public interface IQuizService
{
    public Task<IEnumerable<QuizzezDto>> GetQuizzesAsync();
    public Task CreateQuizAsync(CreateQuizDto body, CancellationToken cancellationToken);
    public Task DeleteQuizzezAsync([FromRoute] int id, CancellationToken cancellationToken);
}