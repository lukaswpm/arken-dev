namespace ArkenERP.Core.DTOs
{
    public class AuthDtos
    {
        public sealed record LoginRequest(string Email, string Password, string DeviceId);

        public sealed record RefreshRequest(string RefreshToken, string DeviceId);

        public sealed record UserDto(
            Guid Id,
            string Email,
            string Name,
            string? AvatarUrl,
            string? Role
        );

        public sealed record TenantDto(
            Guid Id,
            string Name,
            string Slug
        );

        public sealed record LoginResponse(
            string AccessToken,
            string RefreshToken,
            DateTimeOffset ExpiresAt,
            UserDto User,
            TenantDto Tenant
        );
    }
}
