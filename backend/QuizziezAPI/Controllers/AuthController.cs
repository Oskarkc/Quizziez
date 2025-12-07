using Microsoft.AspNetCore.Mvc;
using QuizziezAPI.DTO_s;
using QuizziezAPI.Services;

namespace QuizziezAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }
    
    [HttpPost("register")]
    public async Task<IActionResult> RegisterUser([FromBody] RegisterDto body)
    {
        var token = await _authService.RegisterUserAsync(body);
        
        if (token == null)
            return BadRequest("User could not be created");
        
        return Ok( token );
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto body)
    {
        var token = await _authService.LoginAsync(body);
        if(token == null)
            return BadRequest(new { message = "Invalid credentials" });
        
        return Ok( token );
    }
    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh([FromBody] RefreshRequestDto dto)
    {
        var token = await _authService.RefreshTokenAsync(dto);
        if (token == null)
            return Unauthorized(new { message = "Invalid refresh token" });
        return Ok(token);
    }
}