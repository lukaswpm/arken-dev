using ArkenERP.Lib.Domain.Entities.Identity;

namespace ArkenERP.Core.Services
{
    public interface ITokenService
    {
        public string GenerateAccessToken(User user);
        public RefreshToken GenerateRefreshToken(Guid userId, string deviceId, string? ipAddress, string? userAgent);
    }
}
