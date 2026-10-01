using ArkenERP.Lib.Domain.Entities.Base;

namespace ArkenERP.Lib.Domain.Entities.Identity
{
    public class Session : Entity
    {
        public Guid UserId { get; private set; }

        public string RefreshTokenHash { get; private set; } = string.Empty;

        public string? IpAddress { get; private set; }

        public string? UserAgent { get; private set; }

        public DateTime ExpiresAt { get; private set; }

        public DateTime? RevokedAt { get; private set; }

        public User User { get; private set; } = null!;

        private Session() { }
    }
}
