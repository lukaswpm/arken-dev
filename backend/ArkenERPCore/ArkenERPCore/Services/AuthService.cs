using ArkenERP.Lib.Context;
using ArkenERP.Lib.Domain.Entities.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace ArkenERP.Core.Services
{
    public class AuthService(ManagerDbContext dbContext) : IAuthService
    {
        public async Task<TenantUser?> AuthenticateUserAsync(string email, string password)
        {
            var normalizedEmail = email.Trim().ToLowerInvariant();

            var tenantUser = await dbContext.TenantUsers
                .Include(tu => tu.User)
                .Include(tu => tu.Tenant)
                .Include(tu => tu.Role)
                .FirstOrDefaultAsync(tu => tu.User.Email.ToLower() == normalizedEmail && tu.User.IsActive);

            if (tenantUser == null)
                return null;

            // Validação de senha: texto puro ou hash SHA256 para o protótipo/portfólio
            if (!VerifyPassword(password, tenantUser.User.PasswordHash))
                return null;

            return tenantUser;
        }

        public async Task<TenantUser?> GetUserByIdAsync(Guid userId)
        {
            return await dbContext.TenantUsers
                .Include(tu => tu.User)
                .Include(tu => tu.Tenant)
                .Include(tu => tu.Role)
                .FirstOrDefaultAsync(tu => tu.UserId == userId && tu.User.IsActive);
        }

        public async Task<RefreshToken?> GetRefreshTokenAsync(string token, string deviceId)
        {
            return await dbContext.RefreshTokens
                .Include(rt => rt.User)
                .FirstOrDefaultAsync(rt => rt.Token == token && rt.DeviceId == deviceId);
        }

        public async Task SaveRefreshTokenAsync(RefreshToken refreshToken)
        {
            var existing = await dbContext.RefreshTokens
                .FirstOrDefaultAsync(rt => rt.UserId == refreshToken.UserId && rt.DeviceId == refreshToken.DeviceId);

            if (existing != null)
            {
                RefreshTokenRotation.Apply(existing, refreshToken);
            }
            else
            {
                await dbContext.RefreshTokens.AddAsync(refreshToken);
            }

            await dbContext.SaveChangesAsync();
        }

        public async Task RevokeRefreshTokenAsync(string token)
        {
            var existing = await dbContext.RefreshTokens.FirstOrDefaultAsync(rt => rt.Token == token);
            if (existing != null)
            {
                existing.RevokedAt = DateTimeOffset.UtcNow;
                await dbContext.SaveChangesAsync();
            }
        }

        private static bool VerifyPassword(string inputPassword, string storedHash)
        {
            if (string.IsNullOrEmpty(storedHash))
                return false;

            if (inputPassword == storedHash)
                return true;

            // Suporte a hash SHA256
            using var sha256 = SHA256.Create();
            var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(inputPassword));
            var hash = Convert.ToHexString(bytes).ToLowerInvariant();
            return hash == storedHash.ToLowerInvariant();
        }
    }
}
