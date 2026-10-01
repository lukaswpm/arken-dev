using ArkenERP.Lib.Domain.Entities.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArkenERP.Lib.Domain.Runtime
{
    public sealed class FileEntity : Entity
    {
        public Guid TenantId { get; private set; }
        public string FileName { get; private set; }

        public string StorageProvider { get; private set; } = string.Empty;

        public string Path { get; private set; } = string.Empty;

        public string MimeType { get; private set; } = string.Empty;

        public long Size { get; private set; }

        public float[]? Embedding { get; private set; }

        public string? MetadataJson { get; private set; }

        public DateTime CreatedAt { get; private set; }

        private FileEntity() { }
    }
}
