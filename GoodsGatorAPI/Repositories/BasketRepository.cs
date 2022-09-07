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
        var basketString = await _database.StringGetAsync(basketId);
        return string.IsNullOrEmpty(basketString) ? null : JsonSerializer.Deserialize<Basket>(basketString);
    }

    public async Task<Basket> AddOrUpdateAsync(Basket basket)
    {
        var changed = await _database.StringSetAsync(basket.Id, JsonSerializer.Serialize(basket.Items), TimeSpan.FromDays(30));

        return !changed ? null : await GetAsync(basket.Id);
    }

    public async Task<bool> DeleteAsync(string basketId)
    {
        return await _database.KeyDeleteAsync(basketId);
    }
}
