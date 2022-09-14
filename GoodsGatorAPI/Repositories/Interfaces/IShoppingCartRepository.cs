using GoodsGatorAPI.Models.RedisEntities;

namespace GoodsGatorAPI.Repositories.Interfaces;

public interface IShoppingCartRepository
{
    Task<ShoppingCart> GetAsync(string cartId); 
    Task<ShoppingCart> AddOrUpdateAsync(ShoppingCart cart); 
    Task<bool> DeleteAsync(string cartId);
}
