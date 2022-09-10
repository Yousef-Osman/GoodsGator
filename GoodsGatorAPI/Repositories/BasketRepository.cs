using GoodsGatorAPI.Models.RedisEntities;
using GoodsGatorAPI.Repositories.Interfaces;
using StackExchange.Redis;
using System.Text.Json;

namespace GoodsGatorAPI.Repositories;

public class BasketRepository : IBasketRepository
{
    private readonly IDatabase _database;

    public BasketRepository(IConnectionMultiplexer redis)
    {
        _database = redis.GetDatabase();
    }

    public async Task<Basket> GetAsync(string basketId)
    {
        if (string.IsNullOrEmpty(basketId))
            return null;

        var basketData = await _database.StringGetAsync(basketId);
        var basket = basketData.IsNullOrEmpty ? null : JsonSerializer.Deserialize<Basket>(basketData);
        return basket;
    }

    public async Task<Basket> AddOrUpdateAsync(Basket basket)
    {
        var changed = await _database.StringSetAsync(basket.Id, JsonSerializer.Serialize(basket), TimeSpan.FromDays(30));

        return !changed ? null : await GetAsync(basket.Id);
    }

    public async Task<bool> DeleteAsync(string basketId)
    {
        return await _database.KeyDeleteAsync(basketId);
    }
}
