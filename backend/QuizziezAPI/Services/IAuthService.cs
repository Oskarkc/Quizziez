using Microsoft.AspNetCore.Identity;
using QuizziezAPI.DTO_s;

namespace QuizziezAPI.Services;

public interface IAuthService
{
    Task<AuthResponseDto?> RegisterUserAsync(RegisterDto dto);
    Task<AuthResponseDto?> LoginAsync(LoginDto dto);
    Task<AuthResponseDto?> RefreshTokenAsync(RefreshRequestDto dto);
    Task RevokeRefreshTokenAsync(string userId);
}