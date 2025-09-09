using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using LaunchView.Server.Data;
using LaunchView.Server.Models;
using LaunchView.Server.Services.Interfaces;
using LaunchView.Server.ViewModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace LaunchView.Server.Services.Implementations;

public class AuthService(ApplicationDbContext dbContext, IConfiguration configuration, IHashService hashService) : IAuthService
{
    public async Task<string> RegisterAsync(RegisterDto registerDto)
    {
        if (string.IsNullOrWhiteSpace(registerDto.Email) || string.IsNullOrWhiteSpace(registerDto.Password))
            throw new ArgumentException("Email and password are required.");

        var email = registerDto.Email.Trim().ToLowerInvariant();

        var exists = await dbContext.ApplicationUsers.AnyAsync(u => u.Email == email);
        if (exists)
            throw new InvalidOperationException("An account with this email already exists.");

        // Hash & salt the password
        hashService.CreatePasswordHash(registerDto.Password, out var hash, out var salt);

        var user = new ApplicationUser()
        {
            Id = Guid.NewGuid(),
            FirstName = registerDto.FirstName,
            LastName = registerDto.LastName,
            Email = email,
            PasswordHash = hash,
            PasswordSalt = salt
        };

        dbContext.ApplicationUsers.Add(user);
        await dbContext.SaveChangesAsync();
        
        return GenerateJwt(user);
    }
    
    public async Task<string> SignInAsync(LoginDto loginDto)
    {
        if (string.IsNullOrWhiteSpace(loginDto.Email) || string.IsNullOrWhiteSpace(loginDto.Password))
            throw new ArgumentException("Email and password are required.");

        var email = loginDto.Email.Trim().ToLowerInvariant();

        var user = await dbContext.ApplicationUsers.SingleOrDefaultAsync(u => u.Email == email);
        // Use same timing even if user not found to reduce user enumeration,
        // by verifying against a dummy salt/hash.
        if (user is null || !hashService.VerifyPassword(loginDto.Password, user.PasswordHash, user.PasswordSalt))
            throw new UnauthorizedAccessException("Invalid credentials.");

        return GenerateJwt(user);
    }

    private string GenerateJwt(ApplicationUser applicationUser)
    {
        var issuer   = configuration["Jwt:Issuer"]   ?? throw new InvalidOperationException("Jwt:Issuer missing");
        var audience = configuration["Jwt:Audience"] ?? issuer;
        var key      = configuration["Jwt:Key"]      ?? throw new InvalidOperationException("Jwt:Key missing");

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
        var creds = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, applicationUser.Id.ToString()),
            new(JwtRegisteredClaimNames.Email, applicationUser.Email),
            new ("FirstName", applicationUser.FirstName),
            new ("LastName", applicationUser.LastName),
        };

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            notBefore: DateTime.UtcNow,
            expires: DateTime.UtcNow.AddMinutes(60),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

}