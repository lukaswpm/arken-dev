using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArkenERP.Lib.Domain.Runtime
{
    public sealed class McpOperation
    {
        public long Id { get; private set; }

        public Guid TenantId { get; private set; }

        public string OperationType { get; private set; } = string.Empty;

        public string SchemaName { get; private set; } = string.Empty;

        public string SqlExecuted { get; private set; } = string.Empty;
        public string? ErrorMessage { get; private set; }

        public bool Success { get; private set; }

        public DateTime CreatedAt { get; private set; }

        public DateTime? FinishedAt { get; private set; }

        private McpOperation() { }
    }
}
