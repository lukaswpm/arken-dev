using ArkenERP.Lib.Domain.Entities.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArkenERP.Lib.Domain.Runtime.AI
{
    public sealed class AiAgent : Entity
    {
        public string Name { get; private set; } = string.Empty;

        public string Description { get; private set; } = string.Empty;

        public string ModelProvider { get; private set; } = string.Empty;

        public string ModelName { get; private set; } = string.Empty;

        public string SystemPrompt { get; private set; } = string.Empty;

        public decimal Temperature { get; private set; }

        public bool MemoryEnabled { get; private set; }

        public bool IsActive { get; private set; }

        public string? ConfigJson { get; private set; }

        public DateTime CreatedAt { get; private set; }

        public DateTime UpdatedAt { get; private set; }

        private AiAgent() { }
    }
}
