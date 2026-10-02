using ArkenERP.Lib.Context;

namespace ArkenERP.Core.API.Middlewares
{
    public class TenantResolverMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<TenantResolverMiddleware> _logger;

        public TenantResolverMiddleware(RequestDelegate next, ILogger<TenantResolverMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context, ITenantContext tenantContext)
        {
            var path = context.Request.Path;
            // Ignora preflight CORS e rotas de sistema como Health Checks, Swagger/OpenApi e Autenticação pública
            if (HttpMethods.IsOptions(context.Request.Method) ||
                path.StartsWithSegments("/health") ||
                path.StartsWithSegments("/swagger") ||
                path.StartsWithSegments("/openapi") ||
                path.StartsWithSegments("/favicon.ico") ||
                path.StartsWithSegments("/api/v1/auth"))
            {
                await _next(context);
                return;
            }

            // Busca o X-Tenant-ID do header
            if (context.Request.Headers.TryGetValue("X-Tenant-ID", out var tenantIdString) && !string.IsNullOrWhiteSpace(tenantIdString))
            {
                if (Guid.TryParse(tenantIdString, out Guid tenantId))
                {
                    tenantContext.SetTenantId(tenantId);
                }
                else if (tenantIdString == "loja-modelo" || tenantIdString == "default")
                {
                    tenantContext.SetTenantId(Guid.Parse("11111111-1111-1111-1111-111111111111"));
                }
                else
                {
                    _logger.LogWarning("Tentativa de acesso com X-Tenant-ID inválido: {Tenant}", tenantIdString);
                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    await context.Response.WriteAsJsonAsync(new { Error = "Tenant inválido." });
                    return;
                }
            }
            else
            {
                // Fallback para o tenant padrão do portfólio
                tenantContext.SetTenantId(Guid.Parse("11111111-1111-1111-1111-111111111111"));
            }

            await _next(context);
        }
    }
}
