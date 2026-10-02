using ArkenERP.Lib.Context;
using ArkenERP.Lib.Domain.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace ArkenERP.Core.Controllers
{
    [ApiController]
    [Route("api/v1/dashboard")]
    public class DashboardController(RuntimeDbContext runtimeDb) : ControllerBase
    {
        [HttpGet("summary")]
        public async Task<IActionResult> GetSummary()
        {
            var ptBr = new CultureInfo("pt-BR");
            var now = DateTime.UtcNow;
            var recentThreshold = now.AddDays(-30);
            var previousThreshold = now.AddDays(-60);

            // 1. Pedidos e Faturamento
            var orders = await runtimeDb.Orders
                .Include(o => o.Customer)
                .OrderBy(o => o.OrderDate)
                .ToListAsync();

            var totalSales = orders.Sum(o => o.TotalAmount);
            var ordersCount = orders.Count;
            var avgTicket = ordersCount > 0 ? totalSales / ordersCount : 0m;

            var recentOrders = orders.Where(o => o.OrderDate >= recentThreshold).ToList();
            var previousOrders = orders.Where(o => o.OrderDate >= previousThreshold && o.OrderDate < recentThreshold).ToList();

            var recentSalesTotal = recentOrders.Sum(o => o.TotalAmount);
            var previousSalesTotal = previousOrders.Sum(o => o.TotalAmount);
            var salesDeltaPct = previousSalesTotal > 0
                ? Math.Round(((recentSalesTotal - previousSalesTotal) / previousSalesTotal) * 100, 1)
                : 0.0m;
            var salesTrend = salesDeltaPct >= 0 ? "up" : "down";

            var ordersDeltaPct = previousOrders.Count > 0
                ? Math.Round(((decimal)(recentOrders.Count - previousOrders.Count) / previousOrders.Count) * 100, 1)
                : 0.0m;
            var ordersTrend = ordersDeltaPct >= 0 ? "up" : "down";

            // 2. Clientes
            var totalClients = await runtimeDb.Clients.CountAsync();
            var activeClients = await runtimeDb.Clients.CountAsync(c => c.Status == ClientStatus.Active);
            var activeDeltaPct = totalClients > 0
                ? Math.Round(((decimal)activeClients / totalClients) * 100, 1)
                : 0.0m;

            // 3. Ticket Médio Variação
            var recentAvgTicket = recentOrders.Count > 0 ? recentOrders.Average(o => o.TotalAmount) : avgTicket;
            var previousAvgTicket = previousOrders.Count > 0 ? previousOrders.Average(o => o.TotalAmount) : 0m;
            var ticketDeltaPct = previousAvgTicket > 0
                ? Math.Round(((recentAvgTicket - previousAvgTicket) / previousAvgTicket) * 100, 1)
                : 0.0m;
            var ticketTrend = ticketDeltaPct >= 0 ? "up" : "down";

            // 4. Métricas consolidadas (KpiCard)
            var metrics = new[]
            {
                new
                {
                    label = "Faturamento Total",
                    value = totalSales.ToString("C", ptBr),
                    change = $"{(salesDeltaPct >= 0 ? "+" : "")}{salesDeltaPct.ToString("0.0", ptBr)}%",
                    trendDirection = salesTrend,
                    caption = "em relação ao mês anterior",
                    tone = "blue"
                },
                new
                {
                    label = "Pedidos Realizados",
                    value = ordersCount.ToString(),
                    change = $"{(ordersDeltaPct >= 0 ? "+" : "")}{ordersDeltaPct.ToString("0.0", ptBr)}%",
                    trendDirection = ordersTrend,
                    caption = "em relação ao mês anterior",
                    tone = "purple"
                },
                new
                {
                    label = "Clientes Ativos",
                    value = activeClients.ToString(),
                    change = $"{activeDeltaPct.ToString("0.0", ptBr)}%",
                    trendDirection = "up",
                    caption = "taxa de atividade",
                    tone = "green"
                },
                new
                {
                    label = "Ticket Médio",
                    value = avgTicket.ToString("C", ptBr),
                    change = $"{(ticketDeltaPct >= 0 ? "+" : "")}{ticketDeltaPct.ToString("0.0", ptBr)}%",
                    trendDirection = ticketTrend,
                    caption = "em relação ao mês anterior",
                    tone = "orange"
                }
            };

            // 5. Evolução temporal de receita (gráfico de área/linha)
            var revenueData = orders
                .GroupBy(o => o.OrderDate.ToString("dd/MM"))
                .Select(g => new
                {
                    date = g.Key,
                    value = (double)g.Sum(o => o.TotalAmount),
                    label = g.Sum(o => o.TotalAmount).ToString("C", ptBr)
                })
                .ToList();

            // 6. Participação por categoria (donut)
            var categoryColors = new[] { "#2563eb", "#7c3aed", "#059669", "#d97706", "#dc2626", "#0891b2" };
            var categoryGroup = await runtimeDb.Products
                .Include(p => p.ProductCategory)
                .GroupBy(p => p.ProductCategory != null ? p.ProductCategory.Name : "Geral")
                .Select(g => new { Name = g.Key, Count = g.Count() })
                .ToListAsync();

            var totalProductsCount = categoryGroup.Sum(c => c.Count);
            var categoryShares = categoryGroup.Select((c, idx) =>
            {
                var pct = totalProductsCount > 0 ? Math.Round((double)c.Count / totalProductsCount * 100, 1) : 0.0;
                return new
                {
                    name = c.Name,
                    value = c.Count,
                    percentage = $"{pct:0.0}%",
                    numPercentage = pct,
                    color = categoryColors[idx % categoryColors.Length]
                };
            }).ToList();

            // 7. Vendas recentes (tabela)
            var recentSales = orders
                .OrderByDescending(o => o.OrderDate)
                .Take(6)
                .Select(o => new
                {
                    id = o.Id.ToString(),
                    orderNumber = !string.IsNullOrWhiteSpace(o.OrderNumber) ? o.OrderNumber : $"#000{o.Id.ToString()[..4]}",
                    date = o.OrderDate.ToString("dd/MM/yyyy"),
                    customer = o.Customer != null ? $"{o.Customer.Name} {o.Customer.Surname}".Trim() : "Cliente Diversos",
                    total = o.TotalAmount.ToString("C", ptBr),
                    rawTotal = o.TotalAmount,
                    status = o.Status
                })
                .ToList();

            // 8. Produtos em destaque
            var featuredProducts = await runtimeDb.Products
                .Include(p => p.ProductCategory)
                .OrderByDescending(p => p.Price)
                .Take(4)
                .Select(p => new
                {
                    id = p.Id.ToString(),
                    name = p.Name,
                    category = p.ProductCategory != null ? p.ProductCategory.Name : "Geral",
                    price = p.Price.ToString("C", ptBr),
                    value = p.Price.ToString("C", ptBr),
                    sales = p.StockQuantity > 0 ? p.StockQuantity : 0,
                    stock = p.StockQuantity,
                    image = p.ImageUrl
                })
                .ToListAsync();

            return Ok(new
            {
                metrics,
                revenueData,
                categoryShares,
                recentSales,
                featuredProducts
            });
        }
    }
}
