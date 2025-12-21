using System.Text.Json.Serialization;

namespace QuizziezAPI.DTO_s;

public class AuthResponseDto
{
    public string AccessToken { get; set; } = null!;
    [JsonIgnore]
    public string RefreshToken { get; set; } = null!;
}