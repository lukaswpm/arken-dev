using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArkenERP.Lib.Domain.Runtime
{
    public sealed class SemanticCache
    {
        public long Id { get; private set; }

        public Guid TenantId { get; private set; }

        public string PromptHash { get; private set; } = string.Empty;

        public string Prompt { get; private set; } = string.Empty;

        public string Response { get; private set; } = string.Empty;

        public float[] Embedding { get; private set; } = [];

        public string? MetadataJson { get; private set; }

        public DateTime CreatedAt { get; private set; }

        public DateTime LastUsedAt { get; private set; }

        private SemanticCache() { }
    }
}
