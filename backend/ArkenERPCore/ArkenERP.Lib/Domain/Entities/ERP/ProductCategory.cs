using ArkenERP.Lib.Domain.Entities.Base;

namespace ArkenERP.Lib.Domain.Entities.ERP
{
    public class ProductCategory: AuditableEntity
    {
        public string Name { get; private set; } = string.Empty;
        public string Description { get; private set; } = string.Empty;

        public static ProductCategory Create(string name, string description = "")
        {
            return new ProductCategory
            {
                Name = name,
                Description = description
            };
        }
    }
}
