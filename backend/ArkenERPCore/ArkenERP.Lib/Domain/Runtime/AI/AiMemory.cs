using ArkenERP.Lib.Domain.Entities.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArkenERP.Lib.Domain.Runtime.AI
{
    public sealed class AiMemory : Entity
    {
        public Guid AgentId { get; private set; }

        public string MemoryType { get; private set; } = string.Empty;

        public string Content { get; private set; } = string.Empty;

        public float[] Embedding { get; private set; } = [];

        public string? MetadataJson { get; private set; }

        public DateTime CreatedAt { get; private set; }

        private AiMemory() { }
    }
}
