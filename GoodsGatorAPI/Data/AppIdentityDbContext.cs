using GoodsGatorAPI.Models.IdentityEntities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace GoodsGatorAPI.Data;

public class AppIdentityDbContext : IdentityDbContext<AppUser>
{
    public AppIdentityDbContext(DbContextOptions<AppIdentityDbContext> options) : base(options)
    {
    }

    public DbSet<Address> Address { get; set; }

    protected override  void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
    }
}
