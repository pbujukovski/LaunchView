using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using LaunchView.Server.Data;
using LaunchView.Server.Models;

namespace LaunchView.Server.Builder;

    public static class ModelBuilderExtention
    { 
        public static void ConfigurationEntity(this ModelBuilder builder)
        {
        }
        public static Task SeedAsync(this ModelBuilder modelBuilder, ApplicationDbContext applicationDbContext)
        {
            return Task.CompletedTask;
        }
    }