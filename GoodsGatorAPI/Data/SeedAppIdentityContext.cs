using GoodsGatorAPI.Models.IdentityEntities;
using Microsoft.AspNetCore.Identity;

namespace GoodsGatorAPI.Data;

public class SeedAppIdentityContext
{
    public static async Task SeedUserAsync(UserManager<AppUser> userManager)
    {
        if (!userManager.Users.Any())
        {
            var user = new AppUser
            {
                FirstName = "Admin",
                LastName = "User",
                UserName = "admin@gmail.com",
                Email = "admin@gmail.com",
                PhoneNumber = "01229778668",
                Address = new Address
                {
                    FullAddress = "user Address",
                    City = "Alexandria",
                    Governorate = "Alexandria",
                    Country = "Egypt"
                }
            };

            await userManager.CreateAsync(user, "Pa$$w0rd");
        }
    }
}
