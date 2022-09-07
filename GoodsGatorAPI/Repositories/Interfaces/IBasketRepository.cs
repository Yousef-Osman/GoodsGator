using GoodsGatorAPI.Models.RedisEntities;

namespace GoodsGatorAPI.Repositories.Interfaces;

public interface IBasketRepository
{
    Task<Basket> GetAsync(string basketId); 
    Task<Basket> AddOrUpdateAsync(Basket basket); 
    Task<bool> DeleteAsync(string basketId);
}
