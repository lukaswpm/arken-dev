using ArkenERP.Core.DTOs;
using ArkenERP.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ArkenERP.Core.Controllers
{
    [ApiController]
    [Route("api/v1/auth")]
    public class AuthenticationController(
            IAuthService authService,
            ITokenService tokenService,
            ILogger<AuthenticationController> logger
        ) : ControllerBase
    {
        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] AuthDtos.LoginRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
                return BadRequest(new { message = "E-mail e senha são obrigatórios." });

            var tenantUser = await authService.AuthenticateUserAsync(request.Email, request.Password);
            if (tenantUser == null)
            {
                logger.LogWarning("Tentativa de login inválida para o e-mail: {Email}", request.Email);
                return Unauthorized(new { message = "Credenciais inválidas ou usuário inativo." });
            }

            var user = tenantUser.User;
            var tenant = tenantUser.Tenant;

            var accessToken = tokenService.GenerateAccessToken(user);
            var deviceId = string.IsNullOrWhiteSpace(request.DeviceId) ? "default-web-client" : request.DeviceId;
            var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString();
            var userAgent = Request.Headers.UserAgent.ToString();

            var refreshToken = tokenService.GenerateRefreshToken(user.Id, deviceId, ipAddress, userAgent);
            await authService.SaveRefreshTokenAsync(refreshToken);

            var response = new AuthDtos.LoginResponse(
                AccessToken: accessToken,
                RefreshToken: refreshToken.Token,
                ExpiresAt: refreshToken.ExpiresAt,
                User: new AuthDtos.UserDto(
                    Id: user.Id,
                    Email: user.Email,
                    Name: user.FirstName ?? user.Username,
                    AvatarUrl: user.AvatarUrl,
                    Role: tenantUser.Role?.Name ?? "Admin"
                ),
                Tenant: new AuthDtos.TenantDto(
                    Id: tenant.Id,
                    Name: tenant.CompanyName,
                    Slug: tenant.Slug
                )
            );

            return Ok(response);
        }

        [HttpPost("refresh")]
        [AllowAnonymous]
        public async Task<IActionResult> RefreshToken([FromBody] AuthDtos.RefreshRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.RefreshToken))
                return BadRequest(new { message = "Refresh token é obrigatório." });

            var storedToken = await authService.GetRefreshTokenAsync(request.RefreshToken, request.DeviceId);
            if (storedToken == null || !storedToken.IsActive)
                return Unauthorized(new { message = "Refresh token expirado ou revogado." });

            var tenantUser = await authService.GetUserByIdAsync(storedToken.UserId);
            if (tenantUser == null)
                return Unauthorized(new { message = "Usuário associado não encontrado." });

            var newAccessToken = tokenService.GenerateAccessToken(tenantUser.User);
            var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString();
            var userAgent = Request.Headers.UserAgent.ToString();

            var newRefreshToken = tokenService.GenerateRefreshToken(
                tenantUser.User.Id,
                request.DeviceId,
                ipAddress,
                userAgent
            );

            await authService.SaveRefreshTokenAsync(newRefreshToken);

            var response = new AuthDtos.LoginResponse(
                AccessToken: newAccessToken,
                RefreshToken: newRefreshToken.Token,
                ExpiresAt: newRefreshToken.ExpiresAt,
                User: new AuthDtos.UserDto(
                    Id: tenantUser.User.Id,
                    Email: tenantUser.User.Email,
                    Name: tenantUser.User.FirstName ?? tenantUser.User.Username,
                    AvatarUrl: tenantUser.User.AvatarUrl,
                    Role: tenantUser.Role?.Name ?? "Admin"
                ),
                Tenant: new AuthDtos.TenantDto(
                    Id: tenantUser.Tenant.Id,
                    Name: tenantUser.Tenant.CompanyName,
                    Slug: tenantUser.Tenant.Slug
                )
            );

            return Ok(response);
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout([FromBody] AuthDtos.RefreshRequest request)
        {
            if (!string.IsNullOrWhiteSpace(request.RefreshToken))
            {
                await authService.RevokeRefreshTokenAsync(request.RefreshToken);
            }
            return Ok(new { message = "Logout realizado com sucesso." });
        }

        [HttpGet("me")]
        public async Task<IActionResult> GetCurrentUser()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
                return Unauthorized(new { message = "Usuário não autenticado." });

            var tenantUser = await authService.GetUserByIdAsync(userId);
            if (tenantUser == null)
                return NotFound(new { message = "Usuário não encontrado." });

            return Ok(new
            {
                user = new AuthDtos.UserDto(
                    Id: tenantUser.User.Id,
                    Email: tenantUser.User.Email,
                    Name: tenantUser.User.FirstName ?? tenantUser.User.Username,
                    AvatarUrl: tenantUser.User.AvatarUrl,
                    Role: tenantUser.Role?.Name ?? "Admin"
                ),
                tenant = new AuthDtos.TenantDto(
                    Id: tenantUser.Tenant.Id,
                    Name: tenantUser.Tenant.CompanyName,
                    Slug: tenantUser.Tenant.Slug
                )
            });
        }
    }
}
