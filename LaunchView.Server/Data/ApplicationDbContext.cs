using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using LaunchView.Server.Models;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using LaunchView.Server.Builder;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace LaunchView.Server.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions options)
        : base(options)
    {

    }
    
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        ModelBuilderExtention.ConfigurationEntity(builder);

        // If you need seed data here, use synchronous HasData only.
        // ModelBuilderExtention.Seed(builder); // make this synchronous, or remove.
    }
    
}