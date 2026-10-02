using ArkenERP.Lib.Domain.Entities.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace ArkenERP.Core.Services
{

    public class TokenService (IConfiguration _configuration) : ITokenService
    {

        // 1. Gera o Access Token (JWT) de vida curta
        public string GenerateAccessToken(User user)
        {
            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim("name", user.FirstName ?? user.Username)
        };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(15), // Vida curta
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"],
                SigningCredentials = creds
            };

            var handler = new JwtSecurityTokenHandler();
            var token = handler.CreateToken(tokenDescriptor);

            return handler.WriteToken(token);
        }

        // 2. Gera o Refresh Token (String Opaca)
        public RefreshToken GenerateRefreshToken(Guid userId, string deviceId, string? ipAddress, string? userAgent)
        {
            var randomBytes = new byte[64];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomBytes);
            }

            return new RefreshToken
            {
                UserId = userId,
                Token = Convert.ToBase64String(randomBytes),
                DeviceId = deviceId,
                IpAddress = ipAddress,
                UserAgent = userAgent,
                ExpiresAt = DateTimeOffset.UtcNow.AddDays(30),
                CreatedAt = DateTimeOffset.UtcNow
            };
        }
    }
}
