using ArkenERP.Lib.Context;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.OpenApi;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddOpenApi(options =>
{
    options.AddDocumentTransformer((document, context, cancellationToken) =>
    {
        // 1. Título e Versão da API
        document.Info = new OpenApiInfo
        {
            Title = "ArkenERP API",
            Version = "v1"
        };

        // 2. Registra o SecurityScheme no Components
        document.Components ??= new OpenApiComponents();
        document.Components.SecuritySchemes.Add("TenantId", new OpenApiSecurityScheme
        {
            Description = "Insira o ID do Tenant (GUID). Exemplo: a1b2c3d4-e5f6-7890-1234-56789abcdef0",
            Name = "X-Tenant-ID",
            In = ParameterLocation.Header,
            Type = SecuritySchemeType.ApiKey
        });

        // 3. Aplica o SecurityRequirement globalmente usando document.Security
        document.Security ??= [];
        document.Security.Add(new OpenApiSecurityRequirement
        {
            [new OpenApiSecuritySchemeReference("TenantId", document)] = []
        });

        return Task.CompletedTask;
    });
});

builder.Services.AddScoped<ITenantContext, ArkenERP.Core.Security.TenantContext>();
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
