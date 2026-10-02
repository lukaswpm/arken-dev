using ArkenERP.Lib.Domain.Entities.Base;
using ArkenERP.Lib.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace ArkenERP.Lib.Domain.Entities.ERP
{
    public class Sale: AuditableEntity 
    {
        public Guid ClientId { get; private set; }
        public decimal TotalAmount { get; private set; }
        public DateTime SaleDate { get; private set; }
        public SaleStatus Status { get; private set; } = SaleStatus.Pending;
        public virtual Client Client { get; private set; } = null!;

        public static Sale Create(Guid clientId, decimal totalAmount, SaleStatus status = SaleStatus.Confirmed, DateTime? saleDate = null)
        {
            return new Sale
            {
                ClientId = clientId,
                TotalAmount = totalAmount,
                Status = status,
                SaleDate = saleDate ?? DateTime.UtcNow
            };
        }
    }
}
