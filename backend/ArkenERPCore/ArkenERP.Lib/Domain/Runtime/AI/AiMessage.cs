using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArkenERP.Lib.Domain.Runtime.AI
{
    public sealed class AiMessage
    {
        public long Id { get; private set; }

        public Guid ConversationId { get; private set; }

        public string SenderType { get; private set; } = string.Empty;

        public string Message { get; private set; } = string.Empty;

        public int TokensInput { get; private set; }

        public int TokensOutput { get; private set; }

        public string? MetadataJson { get; private set; }

        public DateTime CreatedAt { get; private set; }

        public AiConversation? Conversation { get; private set; }

        private AiMessage() { }
    }
}
