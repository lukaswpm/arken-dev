using ArkenERP.Lib.Context;
using ArkenERP.Lib.Domain.Entities.ERP;
using ArkenERP.Lib.Domain.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace ArkenERP.Core.Controllers
{
    [ApiController]
    [Route("api/v1/products")]
    public class ProductsController(RuntimeDbContext runtimeDb) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetProducts([FromQuery] string? search, [FromQuery] string? category, [FromQuery] string? status)
        {
            var query = runtimeDb.Products.Include(p => p.ProductCategory).AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                var term = search.Trim().ToLower();
                query = query.Where(p => p.Name.ToLower().Contains(term) ||
                                         p.Code.ToLower().Contains(term) ||
                                         p.SKU.ToLower().Contains(term));
            }

            if (!string.IsNullOrWhiteSpace(category) && category != "Todas as categorias" && category != "Todos")
            {
                query = query.Where(p => p.ProductCategory.Name.ToLower() == category.Trim().ToLower());
            }

            if (!string.IsNullOrWhiteSpace(status) && status != "Todos os status")
            {
                if (status == "Sem estoque")
                    query = query.Where(p => p.StockQuantity == 0);
                else if (status == "Estoque baixo")
                    query = query.Where(p => p.StockQuantity > 0 && p.StockQuantity <= 10);
                else if (status == "Em estoque")
                    query = query.Where(p => p.StockQuantity > 10);
            }

            var products = await query.OrderBy(p => p.Name).ToListAsync();
            var ptBr = new CultureInfo("pt-BR");

            var result = products.Select(p => new
            {
                id = p.Id.ToString(),
                name = p.Name,
                subtitle = p.Description,
                category = p.ProductCategory?.Name ?? "Geral",
                code = p.Code,
                sku = p.SKU,
                price = p.Price.ToString("C", ptBr),
                rawPrice = p.Price,
                stock = p.StockQuantity,
                status = p.StockQuantity == 0 ? "Sem estoque" :
                         p.StockQuantity <= 10 ? "Estoque baixo" : "Em estoque",
                image = p.ImageUrl,
                imageUrl = p.ImageUrl,
                brand = p.Brand,
                model = p.Model
            });

            return Ok(result);
        }

        [HttpGet("kpis")]
        [HttpGet("metrics")]
        public async Task<IActionResult> GetProductKpis()
        {
            var ptBr = new CultureInfo("pt-BR");
            var products = await runtimeDb.Products.ToListAsync();

            var totalProducts = products.Count;
            var inStock = products.Count(p => p.StockQuantity > 10);
            var lowStock = products.Count(p => p.StockQuantity > 0 && p.StockQuantity <= 10);
            var outOfStock = products.Count(p => p.StockQuantity == 0);

            // Janela móvel de 30 dias para comparação com período anterior
            var now = DateTime.UtcNow;
            var recentThreshold = now.AddDays(-30);
            var previousProducts = products.Count(p => p.CreatedAt < recentThreshold);
            var totalDeltaPct = previousProducts > 0
                ? Math.Round(((decimal)(totalProducts - previousProducts) / previousProducts) * 100, 1)
                : 0.0m;

            var previousInStock = products.Count(p => p.CreatedAt < recentThreshold && p.StockQuantity > 10);
            var inStockDeltaPct = previousInStock > 0
                ? Math.Round(((decimal)(inStock - previousInStock) / previousInStock) * 100, 1)
                : 0.0m;

            var previousLowStock = products.Count(p => p.CreatedAt < recentThreshold && p.StockQuantity > 0 && p.StockQuantity <= 10);
            var lowStockDelta = lowStock - previousLowStock;

            var previousOutOfStock = products.Count(p => p.CreatedAt < recentThreshold && p.StockQuantity == 0);
            var outOfStockDelta = outOfStock - previousOutOfStock;

            return Ok(new[]
            {
                new
                {
                    label = "Total de Produtos",
                    value = totalProducts.ToString(),
                    change = $"{(totalDeltaPct >= 0 ? "+" : "")}{totalDeltaPct.ToString("0.0", ptBr)}%",
                    trendDirection = totalDeltaPct >= 0 ? "up" : "down",
                    caption = "em relação ao mês anterior",
                    tone = "blue"
                },
                new
                {
                    label = "Produtos em Estoque",
                    value = inStock.ToString(),
                    change = $"{(inStockDeltaPct >= 0 ? "+" : "")}{inStockDeltaPct.ToString("0.0", ptBr)}%",
                    trendDirection = inStockDeltaPct >= 0 ? "up" : "down",
                    caption = "em relação ao mês anterior",
                    tone = "blue"
                },
                new
                {
                    label = "Estoque Crítico",
                    value = lowStock.ToString(),
                    change = $"{(lowStockDelta >= 0 ? "+" : "")}{lowStockDelta} item(ns)",
                    trendDirection = lowStockDelta <= 0 ? "up" : "down",
                    caption = "itens abaixo do mínimo",
                    tone = "orange"
                },
                new
                {
                    label = "Produtos Parados",
                    value = outOfStock.ToString(),
                    change = outOfStock > 0 ? $"{outOfStock} esgotado(s)" : "Estoque normal",
                    trendDirection = outOfStock == 0 ? "up" : "down",
                    caption = "sem estoque para venda",
                    tone = "blue"
                }
            });
        }

        [HttpGet("categories")]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await runtimeDb.ProductCategories
                .OrderBy(c => c.Name)
                .Select(c => new
                {
                    id = c.Id.ToString(),
                    name = c.Name,
                    description = c.Description
                })
                .ToListAsync();

            return Ok(categories);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetProductById(Guid id)
        {
            var product = await runtimeDb.Products
                .Include(p => p.ProductCategory)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
                return NotFound(new { message = "Produto não encontrado." });

            var ptBr = new CultureInfo("pt-BR");
            return Ok(new
            {
                id = product.Id.ToString(),
                name = product.Name,
                subtitle = product.Description,
                category = product.ProductCategory?.Name ?? "Geral",
                categoryId = product.ProductCategoryId.ToString(),
                code = product.Code,
                sku = product.SKU,
                price = product.Price.ToString("C", ptBr),
                rawPrice = product.Price,
                stock = product.StockQuantity,
                status = product.StockQuantity == 0 ? "Sem estoque" :
                         product.StockQuantity <= 10 ? "Estoque baixo" : "Em estoque",
                image = product.ImageUrl,
                imageUrl = product.ImageUrl,
                brand = product.Brand,
                model = product.Model
            });
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromBody] ProductUpsertRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Name))
                return BadRequest(new { message = "O nome do produto é obrigatório." });

            Guid catId = Guid.Empty;
            if (!string.IsNullOrWhiteSpace(request.CategoryId) && Guid.TryParse(request.CategoryId, out var parsedCatId))
            {
                catId = parsedCatId;
            }
            else
            {
                var defaultCat = await runtimeDb.ProductCategories.FirstOrDefaultAsync();
                if (defaultCat != null) catId = defaultCat.Id;
            }

            var code = !string.IsNullOrWhiteSpace(request.Code)
                ? request.Code
                : $"PRD-{Random.Shared.Next(100, 999)}";

            var product = Product.Create(
                request.Name.Trim(),
                request.Description?.Trim() ?? string.Empty,
                code,
                request.Price,
                catId,
                request.StockQuantity,
                brand: request.Brand,
                model: request.Model,
                imageUrl: request.GetEffectiveImage(),
                sku: request.Sku
            );

            await runtimeDb.Products.AddAsync(product);
            await runtimeDb.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProductById), new { id = product.Id }, new
            {
                id = product.Id.ToString(),
                name = product.Name,
                code = product.Code,
                price = product.Price,
                stock = product.StockQuantity
            });
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> UpdateProduct(Guid id, [FromBody] ProductUpsertRequest request)
        {
            var product = await runtimeDb.Products.FirstOrDefaultAsync(p => p.Id == id);
            if (product == null)
                return NotFound(new { message = "Produto não encontrado." });

            Guid catId = product.ProductCategoryId;
            if (!string.IsNullOrWhiteSpace(request.CategoryId) && Guid.TryParse(request.CategoryId, out var parsedCatId))
            {
                catId = parsedCatId;
            }

            product.Update(
                request.Name.Trim(),
                request.Description?.Trim() ?? string.Empty,
                request.Price,
                catId,
                request.StockQuantity,
                brand: request.Brand,
                model: request.Model,
                imageUrl: request.GetEffectiveImage()
            );

            await runtimeDb.SaveChangesAsync();

            return Ok(new
            {
                id = product.Id.ToString(),
                name = product.Name,
                price = product.Price,
                stock = product.StockQuantity
            });
        }

        [HttpPatch("{id:guid}/stock")]
        public async Task<IActionResult> UpdateStock(Guid id, [FromBody] UpdateStockRequest request)
        {
            var product = await runtimeDb.Products.FirstOrDefaultAsync(p => p.Id == id);
            if (product == null)
                return NotFound(new { message = "Produto não encontrado." });

            product.UpdateStock(request.NewStock);
            await runtimeDb.SaveChangesAsync();

            return Ok(new { id = product.Id.ToString(), stock = product.StockQuantity });
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteProduct(Guid id)
        {
            var product = await runtimeDb.Products.FirstOrDefaultAsync(p => p.Id == id);
            if (product == null)
                return NotFound(new { message = "Produto não encontrado." });

            runtimeDb.Products.Remove(product);
            await runtimeDb.SaveChangesAsync();

            return NoContent();
        }
    }

    public class ProductUpsertRequest
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Code { get; set; }
        public string? Sku { get; set; }
        public decimal Price { get; set; }
        public string? CategoryId { get; set; }
        public int StockQuantity { get; set; }
        public string? Brand { get; set; }
        public string? Model { get; set; }
        public string? ImageUrl { get; set; }
        public string? Image { get; set; }

        public string? GetEffectiveImage() => !string.IsNullOrWhiteSpace(ImageUrl) ? ImageUrl : Image;
    }

    public class UpdateStockRequest
    {
        public int NewStock { get; set; }
    }
}
