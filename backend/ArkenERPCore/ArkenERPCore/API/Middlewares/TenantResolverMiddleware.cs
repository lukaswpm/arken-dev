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
            // Ignora rotas de sistema como Health Checks
            if (path.StartsWithSegments("/health") || path.StartsWithSegments("/swagger") || path.StartsWithSegments("/favicon.ico"))
            {
                await _next(context);
                return;
            }

            // Busca o X-Tenant-ID do header (enviado pelo container Python do cliente)
            if (context.Request.Headers.TryGetValue("X-Tenant-ID", out var tenantIdString) &&
                Guid.TryParse(tenantIdString, out Guid tenantId))
            {
                tenantContext.SetTenantId(tenantId);
            }
            else
            {
                // Se não conseguir identificar, bloqueia na porta (Fail Fast)
                _logger.LogWarning("Tentativa de acesso sem X-Tenant-ID detectada.");
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await context.Response.WriteAsJsonAsync(new { Error = "Tenant não identificado." });
                return;
            }

            await _next(context);
        }
    }
}
