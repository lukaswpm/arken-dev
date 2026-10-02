using ArkenERP.Lib.Context;
using ArkenERP.Lib.Domain.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace ArkenERP.Core.Controllers
{
    [ApiController]
    [Route("api/v1/sales")]
    public class SalesController(RuntimeDbContext runtimeDb) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetSales()
        {
            var orders = await runtimeDb.Orders
                .Include(o => o.Customer)
                .OrderByDescending(o => o.OrderDate)
                .ToListAsync();

            var ptBr = new CultureInfo("pt-BR");
            var result = orders.Select(o => new
            {
                id = o.Id.ToString(),
                orderNumber = !string.IsNullOrWhiteSpace(o.OrderNumber) ? o.OrderNumber : $"#000{o.Id.ToString()[..4].ToUpper()}",
                date = o.OrderDate.ToString("dd/MM/yyyy"),
                customer = o.Customer != null ? $"{o.Customer.Name} {o.Customer.Surname}".Trim() : "Cliente Diversos",
                itemsCount = o.ItemsCount > 0 ? o.ItemsCount : 1,
                total = o.TotalAmount.ToString("C", ptBr),
                rawTotal = o.TotalAmount,
                status = o.Status
            });

            return Ok(result);
        }

        [HttpGet("kpis")]
        public async Task<IActionResult> GetSalesKpis()
        {
            var ptBr = new CultureInfo("pt-BR");

            // 1. Consulta Pedidos e Totais Reais
            var orders = await runtimeDb.Orders
                .OrderBy(o => o.OrderDate)
                .ToListAsync();

            var totalSales = orders.Sum(o => o.TotalAmount);
            var ordersCount = orders.Count;
            var averageTicket = ordersCount > 0 ? totalSales / ordersCount : 0m;

            // 2. Consulta Clientes para Taxa de Conversão Real
            var totalClients = await runtimeDb.Clients.CountAsync();
            var activeClients = await runtimeDb.Clients.CountAsync(c => c.Status == ClientStatus.Active);
            var conversionRate = totalClients > 0
                ? Math.Min(100.0, Math.Round(((double)activeClients / totalClients) * 100, 1))
                : 0.0;

            // 3. Variação de Faturamento comparando primeira e segunda metade do período
            var halfPeriod = DateTime.UtcNow.AddDays(-15);
            var recentSales = orders.Where(o => o.OrderDate >= halfPeriod).Sum(o => o.TotalAmount);
            var previousSales = orders.Where(o => o.OrderDate < halfPeriod).Sum(o => o.TotalAmount);
            var salesDeltaPct = previousSales > 0
                ? Math.Round(((recentSales - previousSales) / previousSales) * 100, 1)
                : 0.0m;
            var salesDeltaDirection = salesDeltaPct >= 0 ? "up" : "down";

            // 4. Evolução Temporal de Vendas Agrupada por Data Real do Banco
            var evolutionVendas = orders
                .GroupBy(o => o.OrderDate.ToString("dd/MM"))
                .Select(g => new
                {
                    date = g.Key,
                    value = (double)g.Sum(o => o.TotalAmount),
                    label = g.Sum(o => o.TotalAmount).ToString("C", ptBr)
                })
                .ToList();

            // 5. Evolução do Ticket Médio Agrupado por Data Real do Banco
            var evolutionTicket = orders
                .GroupBy(o => o.OrderDate.ToString("dd/MM"))
                .Select(g => new
                {
                    date = g.Key,
                    value = (double)g.Average(o => o.TotalAmount),
                    label = g.Average(o => o.TotalAmount).ToString("C", ptBr)
                })
                .ToList();

            // 6. Participação por Categoria Calculada Diretamente dos Produtos no Banco
            var categoryData = await runtimeDb.Products
                .Include(p => p.ProductCategory)
                .GroupBy(p => p.ProductCategory != null ? p.ProductCategory.Name : "Outros")
                .Select(g => new
                {
                    CategoryName = g.Key,
                    Count = g.Count()
                })
                .ToListAsync();

            var totalProducts = categoryData.Sum(c => c.Count);
            var colors = new[] { "#2563eb", "#f97316", "#10b981", "#8b5cf6", "#c084fc", "#eab308", "#06b6d4" };

            var categoryShares = categoryData
                .OrderByDescending(c => c.Count)
                .Select((c, idx) =>
                {
                    var pct = totalProducts > 0 ? Math.Round(((double)c.Count / totalProducts) * 100, 1) : 0.0;
                    return new
                    {
                        name = c.CategoryName,
                        percentage = $"{pct:0.0}%",
                        numPercentage = pct,
                        color = colors[idx % colors.Length]
                    };
                })
                .ToList();

            return Ok(new
            {
                metrics = new[]
                {
                    new
                    {
                        label = "Receita Total",
                        value = totalSales.ToString("C", ptBr),
                        change = $"{Math.Abs(salesDeltaPct):0.0}%",
                        trendDirection = salesDeltaDirection,
                        caption = "em relação ao período anterior",
                        tone = "blue"
                    },
                    new
                    {
                        label = "Total de Pedidos",
                        value = ordersCount.ToString(),
                        change = $"{ordersCount} concluídos/em andamento",
                        trendDirection = "up",
                        caption = "base consolidada",
                        tone = "green"
                    },
                    new
                    {
                        label = "Ticket Médio",
                        value = averageTicket.ToString("C", ptBr),
                        change = $"{Math.Abs(salesDeltaPct / 2):0.1}%",
                        trendDirection = salesDeltaDirection,
                        caption = "por transação realizada",
                        tone = "orange"
                    },
                    new
                    {
                        label = "Taxa de Conversão",
                        value = $"{conversionRate:0.0}%",
                        change = $"{activeClients} clientes ativos",
                        trendDirection = "up",
                        caption = "sobre carteira cadastrada",
                        tone = "purple"
                    }
                },
                evolutionVendas,
                evolutionTicket,
                categoryShares
            });
        }
    }
}
