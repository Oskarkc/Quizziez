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
    
}
