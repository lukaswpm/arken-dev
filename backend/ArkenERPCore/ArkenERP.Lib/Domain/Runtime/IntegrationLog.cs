using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArkenERP.Lib.Domain.Runtime
{
    public sealed class IntegrationLog
    {
        public long Id { get; private set; }

        public Guid TenantId { get; private set; }

        public Guid IntegrationId { get; private set; }

        public string? RequestJson { get; private set; }

        public string? ResponseJson { get; private set; }

        public string Status { get; private set; } = string.Empty;

        public DateTime CreatedAt { get; private set; }

        private IntegrationLog() { }
    }
}
