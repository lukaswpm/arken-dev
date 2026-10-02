using ArkenERP.Lib.Domain.Entities.Identity;

namespace ArkenERP.Core.Services
{
    public interface IAuthService
    {
        Task<TenantUser?> AuthenticateUserAsync(string email, string password);
        Task<TenantUser?> GetUserByIdAsync(Guid userId);
        Task<RefreshToken?> GetRefreshTokenAsync(string token, string deviceId);
        Task SaveRefreshTokenAsync(RefreshToken refreshToken);
        Task RevokeRefreshTokenAsync(string token);
    }
}
