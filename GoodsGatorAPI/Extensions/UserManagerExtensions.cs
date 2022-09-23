using GoodsGatorAPI.Models.IdentityEntities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace GoodsGatorAPI.Extensions;

public static class UserManagerExtensions
{
    public static async Task<AppUser> FindUserAsync(this UserManager<AppUser> userManager, ClaimsPrincipal user)
    {
        var email = user.FindFirstValue(ClaimTypes.Email);
        return await userManager.Users.SingleOrDefaultAsync(u=>u.Email == email);
    }

    public static async Task<AppUser> FindUserWithAddressAsync(this UserManager<AppUser> userManager, ClaimsPrincipal user)
    {
        var email = user.FindFirstValue(ClaimTypes.Email);
        return await userManager.Users.Include(u => u.Address).SingleOrDefaultAsync(u => u.Email == email);
    }
}
