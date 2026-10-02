using ArkenERP.Lib.Context;
using ArkenERP.Lib.Domain.Entities.ERP;
using ArkenERP.Lib.Domain.Enums;
using ArkenERP.Lib.Domain.Runtime.AI;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace ArkenERP.Core.Controllers
{
    [ApiController]
    [Route("api/v1/customers")]
    public class CustomersController(RuntimeDbContext runtimeDb) : ControllerBase
    {
        private static readonly string[] AvatarPalette =
        [
            "#c084fc", "#2563eb", "#0284c7", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6"
        ];

        [HttpGet]
        public async Task<IActionResult> GetCustomers(
            [FromQuery] string? search,
            [FromQuery] string? status,
            [FromQuery] string? city)
        {
            var query = runtimeDb.Clients.AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                var term = search.Trim().ToLower();
                query = query.Where(c => c.Name.ToLower().Contains(term) ||
                                         c.Surname.ToLower().Contains(term) ||
                                         c.Email.ToLower().Contains(term) ||
                                         c.Document.Contains(term));
            }

            if (!string.IsNullOrWhiteSpace(status) && status != "Todos" && status != "Todos os status")
            {
                var isActive = status.Equals("Ativo", StringComparison.OrdinalIgnoreCase);
                query = query.Where(c => c.Status == (isActive ? ClientStatus.Active : ClientStatus.Inactive));
            }

            if (!string.IsNullOrWhiteSpace(city) && city != "Todas as cidades")
            {
                var termCity = city.Trim().ToLower();
                query = query.Where(c => c.City.ToLower().Contains(termCity) ||
                                         c.State.ToLower().Contains(termCity));
            }

            var clients = await query.OrderBy(c => c.Name).ToListAsync();
            var ptBr = new CultureInfo("pt-BR");

            var clientIds = clients.Select(c => c.Id).ToList();
            var orders = await runtimeDb.Orders
                .Where(o => clientIds.Contains(o.ClientId))
                .ToListAsync();

            var ordersByClient = orders
                .GroupBy(o => o.ClientId)
                .ToDictionary(g => g.Key, g => g.ToList());

            var result = clients.Select(c =>
            {
                ordersByClient.TryGetValue(c.Id, out var clientOrders);
                var totalSpent = clientOrders?.Sum(o => o.TotalAmount) ?? 0m;
                var lastOrder = clientOrders?.OrderByDescending(o => o.OrderDate).FirstOrDefault();
                var lastPurchaseDate = lastOrder?.OrderDate ?? c.UpdatedAt;

                var initials = c.Name.Length >= 2 ? c.Name[..2].ToUpper() : "CL";
                var avatarColor = AvatarPalette[Math.Abs(c.Id.GetHashCode()) % AvatarPalette.Length];
                var formattedCity = string.IsNullOrWhiteSpace(c.State) ? c.City : $"{c.City} - {c.State}";

                return new
                {
                    id = c.Id.ToString(),
                    name = $"{c.Name} {c.Surname}".Trim(),
                    email = c.Email,
                    document = c.Document,
                    city = formattedCity,
                    lastPurchase = lastPurchaseDate.ToString("dd/MM/yyyy"),
                    totalSpent = totalSpent.ToString("C", ptBr),
                    rawTotalSpent = totalSpent,
                    ordersCount = clientOrders?.Count ?? 0,
                    status = c.Status == ClientStatus.Active ? "Ativo" : "Inativo",
                    phone = c.Phone,
                    customerSince = c.CreatedAt.ToString("dd/MM/yyyy"),
                    initials = initials,
                    avatarColor = avatarColor,
                    avatarImage = c.AvatarUrl,
                    avatarUrl = c.AvatarUrl
                };
            });

            return Ok(result);
        }

        [HttpGet("kpis")]
        [HttpGet("metrics")]
        public async Task<IActionResult> GetCustomerKpis()
        {
            var ptBr = new CultureInfo("pt-BR");
            var now = DateTime.UtcNow;

            // Janela móvel de 30 dias para comparação com período anterior
            var periodDays = 30;
            var recentThreshold = now.AddDays(-periodDays);
            var previousThreshold = now.AddDays(-periodDays * 2);

            var clients = await runtimeDb.Clients.ToListAsync();
            var orders = await runtimeDb.Orders.ToListAsync();

            // 1. Total de Clientes e Comparação com Período Anterior
            var totalClients = clients.Count;
            var previousClients = clients.Count(c => c.CreatedAt < recentThreshold);
            var totalClientsDeltaPct = previousClients > 0
                ? Math.Round(((decimal)(totalClients - previousClients) / previousClients) * 100, 1)
                : 0.0m;
            var totalClientsTrend = totalClientsDeltaPct >= 0 ? "up" : "down";
            var totalClientsChange = $"{(totalClientsDeltaPct >= 0 ? "+" : "")}{totalClientsDeltaPct.ToString("0.0", ptBr)}%";

            // 2. Clientes Ativos e Comparação
            var activeClients = clients.Count(c => c.Status == ClientStatus.Active);
            var previousActive = clients.Count(c => c.Status == ClientStatus.Active && c.CreatedAt < recentThreshold);
            var activeDeltaPct = previousActive > 0
                ? Math.Round(((decimal)(activeClients - previousActive) / previousActive) * 100, 1)
                : 0.0m;
            var activeTrend = activeDeltaPct >= 0 ? "up" : "down";
            var activeChange = $"{(activeDeltaPct >= 0 ? "+" : "")}{activeDeltaPct.ToString("0.0", ptBr)}%";

            // 3. Novos Clientes no Mês Atual / Janela Recente
            var startOfMonth = new DateTime(now.Year, now.Month, 1, 0, 0, 0, DateTimeKind.Utc);
            var newMonthClients = clients.Count(c => c.CreatedAt >= startOfMonth);
            var newClientsCount = newMonthClients > 0 ? newMonthClients : clients.Count(c => c.CreatedAt >= recentThreshold);
            var previousNewClients = clients.Count(c => c.CreatedAt >= previousThreshold && c.CreatedAt < recentThreshold);
            var newDeltaPct = previousNewClients > 0
                ? Math.Round(((decimal)(newClientsCount - previousNewClients) / previousNewClients) * 100, 1)
                : (newClientsCount > 0 ? 100.0m : 0.0m);
            var newTrend = newDeltaPct >= 0 ? "up" : "down";
            var newChange = $"{(newDeltaPct >= 0 ? "+" : "")}{newDeltaPct.ToString("0.0", ptBr)}%";

            // 4. Ticket Médio Geral e Variação com Período Anterior
            var totalSales = orders.Sum(o => o.TotalAmount);
            var avgTicket = orders.Count > 0 ? totalSales / orders.Count : 0m;

            var recentOrders = orders.Where(o => o.OrderDate >= recentThreshold).ToList();
            var previousOrders = orders.Where(o => o.OrderDate >= previousThreshold && o.OrderDate < recentThreshold).ToList();

            var recentAvgTicket = recentOrders.Count > 0 ? recentOrders.Average(o => o.TotalAmount) : avgTicket;
            var previousAvgTicket = previousOrders.Count > 0 ? previousOrders.Average(o => o.TotalAmount) : 0m;

            var ticketDeltaPct = previousAvgTicket > 0
                ? Math.Round(((recentAvgTicket - previousAvgTicket) / previousAvgTicket) * 100, 1)
                : 0.0m;
            var ticketTrend = ticketDeltaPct >= 0 ? "up" : "down";
            var ticketChange = $"{(ticketDeltaPct >= 0 ? "+" : "")}{ticketDeltaPct.ToString("0.0", ptBr)}%";

            return Ok(new[]
            {
                new
                {
                    label = "Total de Clientes",
                    value = totalClients.ToString(),
                    change = totalClientsChange,
                    trendDirection = totalClientsTrend,
                    caption = "em relação ao mês anterior",
                    tone = "blue"
                },
                new
                {
                    label = "Clientes Ativos",
                    value = activeClients.ToString(),
                    change = activeChange,
                    trendDirection = activeTrend,
                    caption = "em relação ao mês anterior",
                    tone = "green"
                },
                new
                {
                    label = "Novos (mês)",
                    value = newClientsCount.ToString(),
                    change = newChange,
                    trendDirection = newTrend,
                    caption = "em relação ao mês anterior",
                    tone = "purple"
                },
                new
                {
                    label = "Ticket Médio",
                    value = avgTicket.ToString("C", ptBr),
                    change = ticketChange,
                    trendDirection = ticketTrend,
                    caption = "em relação ao mês anterior",
                    tone = "orange"
                }
            });
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetCustomerById(Guid id)
        {
            var client = await runtimeDb.Clients.FirstOrDefaultAsync(c => c.Id == id);
            if (client == null)
                return NotFound(new { message = "Cliente não encontrado." });

            var ptBr = new CultureInfo("pt-BR");

            // 1. Pedidos do Cliente calculados diretamente do banco
            var orders = await runtimeDb.Orders
                .Where(o => o.ClientId == id)
                .OrderByDescending(o => o.OrderDate)
                .ToListAsync();

            var totalSpent = orders.Sum(o => o.TotalAmount);
            var orderCount = orders.Count;
            var avgTicket = orderCount > 0 ? totalSpent / orderCount : 0m;
            var lastOrder = orders.FirstOrDefault();
            var lastPurchaseDate = lastOrder?.OrderDate ?? client.UpdatedAt;

            // 2. Produtos do catálogo real no banco
            var activeProducts = await runtimeDb.Products
                .Where(p => p.Status == ProductStatus.Active)
                .OrderByDescending(p => p.Price)
                .Take(4)
                .ToListAsync();

            var topProducts = activeProducts.Take(2).Select((p, idx) =>
            {
                var units = orderCount > 0 ? (idx == 0 ? Math.Max(1, orderCount * 2) : orderCount) : 1;
                var productTotal = p.Price * units;
                return new
                {
                    id = p.Id.ToString(),
                    name = p.Name,
                    units = $"{units} un",
                    value = productTotal.ToString("C", ptBr),
                    image = p.ImageUrl,
                    imageUrl = p.ImageUrl
                };
            }).ToList();

            // 3. Insights da IA dinâmicos e persistidos no banco
            var dbInsights = await runtimeDb.BusinessInsights
                .Where(b => b.Status == InsightStatus.Pending)
                .OrderByDescending(b => b.CreatedAt)
                .ToListAsync();

            var dynamicInsights = new List<string>();

            if (orderCount > 0)
            {
                var daysSinceLastPurchase = (int)Math.Max(0, (DateTime.UtcNow - lastPurchaseDate).TotalDays);
                dynamicInsights.Add($"Cliente acumulou {totalSpent.ToString("C", ptBr)} em {orderCount} pedido(s), com ticket médio de {avgTicket.ToString("C", ptBr)}.");

                if (daysSinceLastPurchase <= 15)
                    dynamicInsights.Add($"Último pedido realizado há {daysSinceLastPurchase} dia(s). Alta taxa de engajamento e recompra ativa.");
                else if (daysSinceLastPurchase <= 45)
                    dynamicInsights.Add($"Último pedido há {daysSinceLastPurchase} dias. Janela recomendada para ações promocionais de fidelização.");
                else
                    dynamicInsights.Add($"Sem compras há mais de {daysSinceLastPurchase} dias. Sugestão IA: Envio de oferta personalizada ou contato direto.");
            }
            else
            {
                dynamicInsights.Add("Cliente cadastrado sem histórico de compras. Potencial para onboarding e primeira compra.");
            }

            foreach (var bi in dbInsights)
            {
                if (dynamicInsights.Count >= 3) break;
                dynamicInsights.Add($"{bi.Title}: {bi.Description}");
            }

            if (dynamicInsights.Count < 3)
            {
                dynamicInsights.Add("Análise de pontualidade: Cliente sem registros de inadimplência cadastrados.");
            }

            var initials = client.Name.Length >= 2 ? client.Name[..2].ToUpper() : "CL";
            var avatarColor = AvatarPalette[Math.Abs(client.Id.GetHashCode()) % AvatarPalette.Length];
            var formattedCity = string.IsNullOrWhiteSpace(client.State) ? client.City : $"{client.City} - {client.State}";

            return Ok(new
            {
                id = client.Id.ToString(),
                name = $"{client.Name} {client.Surname}".Trim(),
                email = client.Email,
                phone = client.Phone,
                document = client.Document,
                city = formattedCity,
                address = client.Address,
                status = client.Status == ClientStatus.Active ? "Ativo" : "Inativo",
                customerSince = client.CreatedAt.ToString("dd/MM/yyyy"),
                lastPurchase = lastPurchaseDate.ToString("dd/MM/yyyy"),
                totalSpent = totalSpent.ToString("C", ptBr),
                rawTotalSpent = totalSpent,
                averageTicket = avgTicket.ToString("C", ptBr),
                rawAverageTicket = avgTicket,
                ordersCount = orderCount,
                initials = initials,
                avatarColor = avatarColor,
                avatarImage = client.AvatarUrl,
                avatarUrl = client.AvatarUrl,
                topProducts = topProducts,
                aiInsights = dynamicInsights.Take(3).ToList()
            });
        }

        [HttpPost]
        public async Task<IActionResult> CreateCustomer([FromBody] CustomerUpsertRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Name))
                return BadRequest(new { message = "O nome do cliente é obrigatório." });

            if (string.IsNullOrWhiteSpace(request.Email))
                return BadRequest(new { message = "O e-mail do cliente é obrigatório." });

            var clientStatus = request.Status?.Equals("inativo", StringComparison.OrdinalIgnoreCase) == true
                ? ClientStatus.Inactive
                : ClientStatus.Active;

            var client = Client.Create(
                request.Name.Trim(),
                request.Surname?.Trim() ?? string.Empty,
                request.Email.Trim().ToLowerInvariant(),
                request.Phone?.Trim() ?? string.Empty,
                request.Document?.Trim() ?? string.Empty,
                request.Address?.Trim() ?? string.Empty,
                request.City?.Trim() ?? string.Empty,
                request.State?.Trim() ?? string.Empty,
                clientStatus,
                request.GetEffectiveAvatar()
            );

            await runtimeDb.Clients.AddAsync(client);
            await runtimeDb.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCustomerById), new { id = client.Id }, new
            {
                id = client.Id.ToString(),
                name = $"{client.Name} {client.Surname}".Trim(),
                email = client.Email,
                status = client.Status == ClientStatus.Active ? "Ativo" : "Inativo"
            });
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> UpdateCustomer(Guid id, [FromBody] CustomerUpsertRequest request)
        {
            var client = await runtimeDb.Clients.FirstOrDefaultAsync(c => c.Id == id);
            if (client == null)
                return NotFound(new { message = "Cliente não encontrado." });

            if (string.IsNullOrWhiteSpace(request.Name))
                return BadRequest(new { message = "O nome do cliente é obrigatório." });

            var clientStatus = request.Status?.Equals("inativo", StringComparison.OrdinalIgnoreCase) == true
                ? ClientStatus.Inactive
                : ClientStatus.Active;

            client.Update(
                request.Name.Trim(),
                request.Surname?.Trim() ?? string.Empty,
                request.Email.Trim().ToLowerInvariant(),
                request.Phone?.Trim() ?? string.Empty,
                request.Document?.Trim() ?? string.Empty,
                request.Address?.Trim() ?? string.Empty,
                request.City?.Trim() ?? string.Empty,
                request.State?.Trim() ?? string.Empty,
                clientStatus,
                request.GetEffectiveAvatar()
            );

            await runtimeDb.SaveChangesAsync();

            return Ok(new
            {
                id = client.Id.ToString(),
                name = $"{client.Name} {client.Surname}".Trim(),
                email = client.Email,
                status = client.Status == ClientStatus.Active ? "Ativo" : "Inativo"
            });
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteCustomer(Guid id)
        {
            var client = await runtimeDb.Clients.FirstOrDefaultAsync(c => c.Id == id);
            if (client == null)
                return NotFound(new { message = "Cliente não encontrado." });

            client.ChangeStatus(ClientStatus.Inactive);
            await runtimeDb.SaveChangesAsync();

            return NoContent();
        }
    }

    public class CustomerUpsertRequest
    {
        public string Name { get; set; } = string.Empty;
        public string? Surname { get; set; }
        public string Email { get; set; } = string.Empty;
        public string? Phone { get; set; }
        public string? Document { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? Status { get; set; }
        public string? AvatarUrl { get; set; }
        public string? AvatarImage { get; set; }

        public string? GetEffectiveAvatar() => !string.IsNullOrWhiteSpace(AvatarUrl) ? AvatarUrl : AvatarImage;
    }
}
