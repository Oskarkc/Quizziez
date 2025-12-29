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
        try
        {
            return Ok(await _quizService.GetQuizzesAsync());
        }
        catch (Exception e)
        {
           return BadRequest(e.Message);
        }
        
    }

    [HttpGet("play")]
    public async Task<IActionResult> GetPlayAsync()
    {
        try
        {
            return Ok(await _quizService.GetQuizzesAsync());
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
        
    }
    [HttpPost]
    public async Task<IActionResult> CreateQuizzezAsync([FromBody] CreateQuizDto body, CancellationToken cancellationToken)
    {
        try
        {
            await _quizService.CreateQuizAsync(body, cancellationToken);
            return Ok(StatusCodes.Status201Created);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    [HttpDelete ("{id}")]
    public async Task<IActionResult> DeleteQuizzezAsync([FromRoute] int id, CancellationToken cancellationToken)
    {
        try
        {
            await _quizService.DeleteQuizzezAsync(id, cancellationToken);
            return Ok(StatusCodes.Status204NoContent);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> EditQuizzezAsync([FromRoute] int id,[FromBody] EditQuizDto body, CancellationToken cancellationToken)
    {
        try
        {
            await _quizService.EditQuizzezAsync(id,body, cancellationToken);
            return Ok("Quiz updated");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("options")]
    public async Task<IActionResult> GetOptionsAsync()
    {
        try
        {
            return Ok(await _quizService.GetQuizzesOptionsAsync());
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetQuizzezByIdAsync([FromRoute] int id)
    {
        try
        {
            return Ok(await _quizService.GetQuizById(id));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}
