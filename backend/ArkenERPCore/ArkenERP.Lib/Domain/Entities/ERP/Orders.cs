using ArkenERP.Lib.Domain.Entities.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace ArkenERP.Lib.Domain.Entities.ERP
{
    public class Orders: AuditableEntity
    {
        public Guid ClientId { get; private set; }
        public DateTime OrderDate { get; private set; } = DateTime.UtcNow;
        public decimal TotalAmount { get; private set; }
        public string Status { get; private set; } = string.Empty;
        public virtual Client Customer { get; private set; } = null!;
    }
}
