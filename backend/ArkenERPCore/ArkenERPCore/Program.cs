using ArkenERP.Core.API.Middlewares;
using ArkenERP.Core.Data;
using ArkenERP.Core.Security;
using ArkenERP.Core.Services;
using ArkenERP.Lib.Context;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;
using System.Text;

DotEnvLoader.Load();

var builder = WebApplication.CreateBuilder(args);

// =============================================================================
// 1. OPENAPI / SWAGGER COM SUPORTE A X-TENANT-ID E BEARER TOKEN
// =============================================================================
builder.Services.AddOpenApi(options =>
{
    options.AddDocumentTransformer((document, context, cancellationToken) =>
    {
        document.Info = new OpenApiInfo
        {
            Title = "ArkenERP API",
            Version = "v1",
            Description = "API do ecossistema ArkenERP com autenticação e isolamento multi-tenant."
        };

        document.Components ??= new OpenApiComponents();
        document.Components.SecuritySchemes ??= new Dictionary<string, IOpenApiSecurityScheme>();

        // 1.1 Header X-Tenant-ID
        document.Components.SecuritySchemes["TenantId"] = new OpenApiSecurityScheme
        {
            Description = "Insira o ID do Tenant (GUID). Exemplo: 11111111-1111-1111-1111-111111111111",
            Name = "X-Tenant-ID",
            In = ParameterLocation.Header,
            Type = SecuritySchemeType.ApiKey
        };

        // 1.2 Bearer JWT
        document.Components.SecuritySchemes["Bearer"] = new OpenApiSecurityScheme
        {
            Description = "Insira o token JWT no formato: Bearer {token}",
            Name = "Authorization",
            In = ParameterLocation.Header,
            Type = SecuritySchemeType.Http,
            Scheme = "bearer",
            BearerFormat = "JWT"
        };

        document.Security ??= new List<OpenApiSecurityRequirement>();
        document.Security.Add(new OpenApiSecurityRequirement
        {
            [new OpenApiSecuritySchemeReference("TenantId", document)] = new List<string>(),
            [new OpenApiSecuritySchemeReference("Bearer", document)] = new List<string>()
        });

        return Task.CompletedTask;
    });
});

// =============================================================================
// 2. CONEXÃO COM BANCOS DE DADOS E EF CORE (DUAL-DATABASE)
// =============================================================================
var managerConnStr = builder.Configuration.GetConnectionString("ManagerDb")
    ?? "Server=127.0.0.1;Port=3308;Database=arken_manage;User=arken_user;Password=GbcL9c1hw98YiZgCT4h1w9j86G306EWQ;";

var runtimeConnStr = builder.Configuration.GetConnectionString("RuntimeDb")
    ?? "Host=127.0.0.1;Port=5433;Database=arken_runtime;Username=arken_user;Password=oawR731Ps68y06KPEgsEM0MRgB0eF66X;";

// Interceptor do EF Core para Multi-Tenancy
builder.Services.AddSingleton<TenantSaveChangesInterceptor>();

// MySQL (ManagerDbContext)
builder.Services.AddDbContext<ManagerDbContext>((sp, options) =>
{
    var interceptor = sp.GetRequiredService<TenantSaveChangesInterceptor>();
    options.UseMySql(managerConnStr, new MySqlServerVersion(new Version(8, 0, 36)),
        mySqlOptions => mySqlOptions.MigrationsHistoryTable("__manager_migrations_history"))
           .AddInterceptors(interceptor);
});

// PostgreSQL (RuntimeDbContext com pgvector)
builder.Services.AddDbContext<RuntimeDbContext>((sp, options) =>
{
    var interceptor = sp.GetRequiredService<TenantSaveChangesInterceptor>();
    options.UseNpgsql(runtimeConnStr, npgsqlOptions =>
    {
        npgsqlOptions.UseVector();
        npgsqlOptions.MigrationsHistoryTable("__runtime_migrations_history", "public");
    })
    .AddInterceptors(interceptor);
});

// =============================================================================
// 3. INJEÇÃO DE DEPENDÊNCIAS DE SERVIÇOS E SEGURANÇA
// =============================================================================
builder.Services.AddScoped<ITenantContext, TenantContext>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ITokenService, TokenService>();

// =============================================================================
// 4. AUTENTICAÇÃO JWT
// =============================================================================
var jwtKey = builder.Configuration["Jwt:Key"] ?? "ArkenSecretSuperKeyForJwtSigning1234567890!@#$%";
var jwtIssuer = builder.Configuration["Jwt:Issuer"] ?? "ArkenERP";
var jwtAudience = builder.Configuration["Jwt:Audience"] ?? "ArkenERPClient";

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
        ValidateIssuer = true,
        ValidIssuer = jwtIssuer,
        ValidateAudience = true,
        ValidAudience = jwtAudience,
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddAuthorization();

// =============================================================================
// 5. POLÍTICA DE CORS (INTEGRAÇÃO COM FRONTEND VITE)
// =============================================================================
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:3000", "http://localhost:5174")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

builder.Services.AddControllers();

var app = builder.Build();

// =============================================================================
// 6. PIPELINE HTTP
// =============================================================================
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

await using (var scope = app.Services.CreateAsyncScope())
{
    var managerDb = scope.ServiceProvider.GetRequiredService<ManagerDbContext>();
    var runtimeDb = scope.ServiceProvider.GetRequiredService<RuntimeDbContext>();

    try
    {
        await managerDb.Database.MigrateAsync();
        await runtimeDb.Database.MigrateAsync();

        if (app.Environment.IsDevelopment())
        {
            await DataSeeder.SeedAsync(managerDb, runtimeDb);
            app.Logger.LogInformation("Migrações e seed inicial dos bancos de dados executados com sucesso.");
        }
        else
        {
            app.Logger.LogInformation("Migrações dos bancos de dados executadas com sucesso.");
        }
    }
    catch (Exception ex)
    {
        if (!app.Environment.IsDevelopment())
        {
            throw;
        }

        app.Logger.LogWarning("Migrações ou seed ignorados (aguardando containers no docker-compose): {Message}", ex.Message);
    }
}

if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

// CORS deve vir antes de Authentication e Middleware de Tenant
app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();

// Middleware de isolamento multi-tenant
app.UseMiddleware<TenantResolverMiddleware>();

app.MapControllers();

app.Run();

static class DotEnvLoader
{
    public static void Load()
    {
        var currentDir = new DirectoryInfo(Directory.GetCurrentDirectory());
        while (currentDir != null)
        {
            var envPath = Path.Combine(currentDir.FullName, ".env");
            if (File.Exists(envPath))
            {
                foreach (var line in File.ReadAllLines(envPath))
                {
                    var trimmed = line.Trim();
                    if (string.IsNullOrWhiteSpace(trimmed) || trimmed.StartsWith('#'))
                        continue;

                    var sepIndex = trimmed.IndexOf('=');
                    if (sepIndex <= 0)
                        continue;

                    var key = trimmed[..sepIndex].Trim();
                    var value = trimmed[(sepIndex + 1)..].Trim();

                    if (value.Length >= 2 && ((value.StartsWith('"') && value.EndsWith('"')) || (value.StartsWith('\'') && value.EndsWith('\''))))
                    {
                        value = value[1..^1];
                    }

                    if (string.IsNullOrEmpty(Environment.GetEnvironmentVariable(key)))
                    {
                        Environment.SetEnvironmentVariable(key, value);
                    }
                }
                return;
            }
            currentDir = currentDir.Parent;
        }
    }
}
