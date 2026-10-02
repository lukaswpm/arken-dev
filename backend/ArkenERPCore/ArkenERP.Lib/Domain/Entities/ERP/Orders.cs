using ArkenERP.Lib.Domain.Entities.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace ArkenERP.Lib.Domain.Entities.ERP
{
    public class Orders : AuditableEntity
    {
        public string OrderNumber { get; private set; } = string.Empty;
        public Guid ClientId { get; private set; }
        public DateTime OrderDate { get; private set; } = DateTime.UtcNow;
        public decimal TotalAmount { get; private set; }
        public int ItemsCount { get; private set; } = 1;
        public string Status { get; private set; } = string.Empty;
        public virtual Client Customer { get; private set; } = null!;

        public static Orders Create(
            Guid clientId,
            decimal totalAmount,
            string status = "Concluído",
            DateTime? orderDate = null,
            string? orderNumber = null,
            int itemsCount = 1)
        {
            return new Orders
            {
                ClientId = clientId,
                TotalAmount = totalAmount,
                Status = status,
                OrderDate = orderDate ?? DateTime.UtcNow,
                OrderNumber = string.IsNullOrWhiteSpace(orderNumber)
                    ? $"#000{Random.Shared.Next(100, 999)}"
                    : orderNumber,
                ItemsCount = itemsCount
            };
        }
    }
}
