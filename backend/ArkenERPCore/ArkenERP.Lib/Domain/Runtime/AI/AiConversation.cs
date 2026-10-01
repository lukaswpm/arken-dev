using ArkenERP.Lib.Domain.Entities.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace ArkenERP.Lib.Domain.Runtime.AI
{
    public sealed class AiConversation : Entity
    {
        public Guid AgentId { get; private set; }

        public string Channel { get; private set; } = string.Empty;

        public string? ExternalUserId { get; private set; }

        public string Status { get; private set; } = string.Empty;

        public string? MetadataJson { get; private set; }

        public DateTime StartedAt { get; private set; }

        public DateTime? EndedAt { get; private set; }

        public ICollection<AiMessage> Messages { get; private set; }
            = new List<AiMessage>();

        private AiConversation() { }
    }
}
