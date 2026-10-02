using ArkenERP.Lib.Context;
using ArkenERP.Lib.Domain.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ArkenERP.Core.Controllers
{
    [ApiController]
    [Route("api/v1/ai")]
    public class AiController(RuntimeDbContext runtimeDb) : ControllerBase
    {
        [HttpGet("insights")]
        public async Task<IActionResult> GetInsights([FromQuery] string? status)
        {
            var query = runtimeDb.BusinessInsights.AsQueryable();

            if (!string.IsNullOrWhiteSpace(status))
            {
                if (Enum.TryParse<InsightStatus>(status, true, out var parsedStatus))
                {
                    query = query.Where(i => i.Status == parsedStatus);
                }
            }

            var insights = await query.OrderByDescending(i => i.CreatedAt).ToListAsync();

            var result = insights.Select(i => new
            {
                id = i.Id.ToString(),
                type = i.Type.ToString(),
                priority = i.Priority.ToString(),
                title = i.Title,
                description = i.Description,
                status = i.Status.ToString(),
                createdAt = i.CreatedAt.ToString("dd/MM/yyyy HH:mm")
            });

            return Ok(result);
        }

        [HttpPost("insights/{id:guid}/apply")]
        public async Task<IActionResult> ApplyInsight(Guid id)
        {
            var insight = await runtimeDb.BusinessInsights.FirstOrDefaultAsync(i => i.Id == id);
            if (insight == null)
                return NotFound(new { message = "Insight não encontrado." });

            insight.MarkAsApplied();
            await runtimeDb.SaveChangesAsync();

            return Ok(new { message = "Otimização aplicada com sucesso!", status = insight.Status.ToString() });
        }

        [HttpPost("insights/{id:guid}/dismiss")]
        public async Task<IActionResult> DismissInsight(Guid id)
        {
            var insight = await runtimeDb.BusinessInsights.FirstOrDefaultAsync(i => i.Id == id);
            if (insight == null)
                return NotFound(new { message = "Insight não encontrado." });

            insight.Dismiss();
            await runtimeDb.SaveChangesAsync();

            return Ok(new { message = "Insight descartado.", status = insight.Status.ToString() });
        }

        [HttpPost("chat")]
        public IActionResult Chat([FromBody] ChatRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Message))
                return BadRequest(new { message = "Mensagem não pode ser vazia." });

            var lower = request.Message.ToLower();
            string reply;

            if (lower.Contains("estoque") || lower.Contains("produto"))
            {
                reply = "Analisando o catálogo: temos 10 produtos cadastrados. O item com menor estoque é a 'Cafeteira Elétrica' (5 un), enquanto o 'Mouse Sem Fio' está sem estoque no momento.";
            }
            else if (lower.Contains("venda") || lower.Contains("faturamento") || lower.Contains("receita"))
            {
                reply = "O volume recente registra 5 pedidos concluídos e em andamento, totalizando aproximadamente R$ 8.810,50 com ticket médio em expansão de 5,4%.";
            }
            else if (lower.Contains("cliente"))
            {
                reply = "Temos 9 clientes na carteira comercial. A cliente Maria Oliveira ME lidera o faturamento acumulado e a Construtora Alfa concluiu seu último pedido recentemente.";
            }
            else
            {
                reply = $"Olá! Sou o assistente de IA do ArkenERP. Estou monitorando seus estoques, faturamento e fluxo de caixa. Como posso ajudar com sua operação hoje?";
            }

            return Ok(new
            {
                response = reply,
                timestamp = DateTime.UtcNow
            });
        }

        public sealed record ChatRequest(string Message);
    }
}
