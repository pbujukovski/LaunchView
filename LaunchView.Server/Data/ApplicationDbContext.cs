using Microsoft.EntityFrameworkCore;
using LaunchView.Server.Builder;
using LaunchView.Server.Models;

namespace LaunchView.Server.Data;

public class ApplicationDbContext(DbContextOptions options) : DbContext(options)
{
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.ConfigurationEntity();
        var task = builder.SeedAsync(this);
        task.Wait();
    }
    
    public DbSet<ApplicationUser> ApplicationUsers { get; set; }
    
}