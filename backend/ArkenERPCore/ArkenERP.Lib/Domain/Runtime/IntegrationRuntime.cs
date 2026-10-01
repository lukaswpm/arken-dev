using ArkenERP.Lib.Domain.Entities.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArkenERP.Lib.Domain.Runtime
{
    public sealed class IntegrationRuntime : Entity
    {
        public Guid TenantId { get; private set; }

        public string Provider { get; private set; } = string.Empty;

        public string Status { get; private set; } = string.Empty;

        public string AuthDataEncrypted { get; private set; }
            = string.Empty;

        public string? ConfigJson { get; private set; }

        public DateTime CreatedAt { get; private set; }

        public DateTime UpdatedAt { get; private set; }

        private IntegrationRuntime() { }
    }
}
