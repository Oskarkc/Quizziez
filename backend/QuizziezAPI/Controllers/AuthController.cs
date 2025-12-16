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
    public async Task<IActionResult> Refresh()
    {
        var refreshToken = Request.Cookies["refreshToken"];
        if (string.IsNullOrEmpty(refreshToken))
            return Unauthorized(new { message = "No refresh token" });
        
        var accessToken = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
        
        var tokens = await _authService.RefreshTokenAsync(new RefreshRequestDto
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken
        });
        
        if (tokens == null)
            return Unauthorized(new { message = "Invalid refresh token" });
        
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            Expires = DateTime.UtcNow.AddDays(30)
        };
        Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
        
        return Ok(tokens);
    }
}