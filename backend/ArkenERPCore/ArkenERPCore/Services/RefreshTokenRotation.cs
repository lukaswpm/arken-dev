using ArkenERP.Lib.Domain.Entities.Identity;

namespace ArkenERP.Core.Services
{
    public static class RefreshTokenRotation
    {
        public static RefreshToken Apply(RefreshToken? existing, RefreshToken generated)
        {
            if (existing is null) return generated;
            existing.Token = generated.Token;
            existing.DeviceId = generated.DeviceId;
            existing.UserAgent = generated.UserAgent;
            existing.IpAddress = generated.IpAddress;
            existing.ExpiresAt = generated.ExpiresAt;
            existing.CreatedAt = generated.CreatedAt;
            existing.RevokedAt = null;
            return existing;
        }
    }
}
