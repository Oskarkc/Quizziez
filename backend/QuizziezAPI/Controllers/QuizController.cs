using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuizziezAPI.DTO_s;
using QuizziezAPI.Exceptions; // Pamiętaj o tym usingu!
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
        var quizzes = await _quizService.GetQuizzesAsync();
        return Ok(quizzes);
    }
    
    [HttpGet("play")]
    public async Task<IActionResult> GetPlayAsync()
    {
        var quizzes = await _quizService.GetAllQuizzesAsync();
        return Ok(quizzes);
    }
    
    [HttpPost]
    public async Task<IActionResult> CreateQuizzezAsync([FromBody] CreateQuizDto body, CancellationToken cancellationToken)
    {
        try
        {
            await _quizService.CreateQuizAsync(body, cancellationToken);
            return StatusCode(StatusCodes.Status201Created);
        }
        catch (QuizValidationException ex)
        {
            return BadRequest(ex.Message);
        }
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteQuizzezAsync([FromRoute] int id, CancellationToken cancellationToken)
    {
        try
        {
            await _quizService.DeleteQuizzezAsync(id, cancellationToken);
            return NoContent();
        }
        catch (QuizValidationException ex)
        {
            return NotFound(ex.Message);
        }
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> EditQuizzezAsync([FromRoute] int id, [FromBody] EditQuizDto body, CancellationToken cancellationToken)
    {
        try
        {
            await _quizService.EditQuizzezAsync(id, body, cancellationToken);
            return NoContent();
        }
        catch (QuizNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
    }
    
    [HttpGet("options")]
    public async Task<IActionResult> GetOptionsAsync()
    {
        var options = await _quizService.GetQuizzesOptionsAsync();
        return Ok(options);
    }
    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetQuizzezByIdAsync([FromRoute] int id)
    {
        try
        {
            var quiz = await _quizService.GetQuizById(id);
            return Ok(quiz);
        }
        catch (QuizNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
    }
    
    [HttpPost("{quizId}")]
    public async Task<IActionResult> CreateQuizAttempt([FromRoute] int quizId, [FromBody] CreateQuizAttemptDto body,
        CancellationToken cancellationToken)
    {
        try
        {
            await _quizService.CreateQuizAttemptAsync(quizId, body, cancellationToken);
            return StatusCode(StatusCodes.Status201Created);
        }
        catch (QuizValidationException ex)
        {
            return BadRequest(ex.Message);
        }
        
    }
}