using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuizziezAPI.DTO_s;
using QuizziezAPI.Services;

namespace QuizziezAPI.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class QuizController : ControllerBase
{

    private readonly IQuizService _quizService;

    public QuizController(IQuizService quizService)
    {
        _quizService = quizService;
    }

    [HttpGet]
    public async Task<IActionResult> GetQuizzesAsync()
    {
        return Ok(await _quizService.GetQuizzesAsync());
    }

    [HttpPost]
    public async Task<IActionResult> CreateQuizzezAsync([FromBody] CreateQuizDto body, CancellationToken cancellationToken)
    {
        
            await _quizService.CreateQuizAsync(body, cancellationToken);
            return Ok(StatusCodes.Status201Created);
    }
    
}
