using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArkenERP.Lib.Domain.Runtime
{
    public sealed class OutboxEvent
    {
        public long Id { get; private set; }

        public Guid TenantId { get; private set; }

        public string EventType { get; private set; } = string.Empty;

        public string AggregateType { get; private set; } = string.Empty;

        public Guid AggregateId { get; private set; }

        public string PayloadJson { get; private set; } = string.Empty;

        public string Status { get; private set; } = string.Empty;

        public int Retries { get; private set; }

        public DateTime CreatedAt { get; private set; }

        public DateTime? ProcessedAt { get; private set; }

        private OutboxEvent() { }
    }
}
