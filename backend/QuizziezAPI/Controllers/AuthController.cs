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
        try
        {
            var token = await _authService.RegisterUserAsync(body);
            if (token != null)
                SetRefreshTokenCookie(token.RefreshToken);
            return Ok(token);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto body)
    {
        try
        {
            var token = await _authService.LoginAsync(body);
            if (token != null)
                SetRefreshTokenCookie(token.RefreshToken);
            return Ok(token);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh()
    {
        var refreshToken = Request.Cookies["refreshToken"];
        if (string.IsNullOrEmpty(refreshToken))
            return Unauthorized("No refresh token");
        var accessToken = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

        try
        {
            var token = await _authService.RefreshTokenAsync(new RefreshRequestDto
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken
            });
            if (token == null)
                return Unauthorized( "Invalid refresh token" );
        
            SetRefreshTokenCookie(token.RefreshToken);
        
            return Ok(token);

        }
        catch (Exception e)
        {
            return Unauthorized(e.Message);
        }
    }
    private void SetRefreshTokenCookie(string refreshToken)
    {
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            Expires = DateTime.UtcNow.AddDays(30)
        };
        Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
    }
}