using ArkenERP.Lib.Domain.Entities.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArkenERP.Lib.Domain.Runtime
{
    public sealed class EntitiesRegistry : Entity
    {
        public Guid TenantId { get; private set; }

        public string EntityType { get; private set; } = string.Empty;

        public Guid EntityId { get; private set; }

        public string Name { get; private set; } = string.Empty;

        public string? MetadataJson { get; private set; }

        public DateTime CreatedAt { get; private set; }

        private EntitiesRegistry() { }
    }
}
