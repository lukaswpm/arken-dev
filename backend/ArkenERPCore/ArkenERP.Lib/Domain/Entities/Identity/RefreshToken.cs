using System;
using System.Collections.Generic;
using System.Text;

namespace ArkenERP.Lib.Domain.Entities.Identity
{
    public class RefreshToken
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid UserId { get; set; }

        // O token real em hash (opcionalmente) ou string opaca
        public string Token { get; set; } = null!;

        // O Fingerprint/Device ID enviado pelo Front-end
        public string DeviceId { get; set; } = null!;

        // Metadados para o painel "Dispositivos Conectados"
        public string? UserAgent { get; set; }
        public string? IpAddress { get; set; }

        // Controle de Validade
        public DateTimeOffset ExpiresAt { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset? RevokedAt { get; set; } // Caso o usuário clique em "Sair"

        // Navegação
        public User User { get; set; } = null!;

        // Propriedade calculada rápida
        public bool IsExpired => DateTimeOffset.UtcNow >= ExpiresAt;
        public bool IsActive => RevokedAt == null && !IsExpired;
    }
}
