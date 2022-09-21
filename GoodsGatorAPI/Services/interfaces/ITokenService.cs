using GoodsGatorAPI.Models.IdentityEntities;

namespace GoodsGatorAPI.Services.interfaces;

public interface ITokenService
{
    string createToken(AppUser user);
}
