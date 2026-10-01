using ArkenERP.Lib.Domain.Entities.Base;
using ArkenERP.Lib.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace ArkenERP.Lib.Domain.Entities.ERP
{
    public class Product: AuditableEntity
    {
        public string Name { get; private set; } = string.Empty;
        public string Description { get; private set; } = string.Empty;
        public string Code { get; private set; } = string.Empty;
        public string? Brand { get; private set; }
        public string? Model { get; private set; }
        public string? Color { get; private set; }
        public string? Size { get; private set; }
        public string? Material { get; private set; }
        public string? Weight { get; private set; }
        public string? ImageUrl { get; private set; }
        public decimal Price { get; private set; }
        public Guid ProductCategoryId { get; private set; }
        public int StockQuantity { get; private set; }
        public ProductStatus Status { get; private set; } = ProductStatus.Active;
        public string SKU { get; private set; } = string.Empty;
        public virtual ProductCategory ProductCategory { get; private set; } = null!;

        public void GenerateSKU()
        {
            SKU = $"{Code}-{Guid.NewGuid().ToString().Substring(0, 8).ToUpper()}";
        }
        public void GenerateCode()
        {
            Code = $"{Name.Substring(0, 3).ToUpper()}-{Guid.NewGuid().ToString().Substring(0, 4).ToUpper()}";
        }
    }
}
