using GoodsGatorAPI.Models.RedisEntities;
using GoodsGatorAPI.Repositories.Interfaces;
using StackExchange.Redis;
using System.Text.Json;

namespace GoodsGatorAPI.Repositories;

public class ShoppingCartRepository : IShoppingCartRepository
{
    private readonly IDatabase _database;

    public ShoppingCartRepository(IConnectionMultiplexer redis)
    {
        _database = redis.GetDatabase();
    }

    public async Task<ShoppingCart> GetAsync(string cartId)
    {
        if (string.IsNullOrEmpty(cartId))
            return null;

        var cartData = await _database.StringGetAsync(cartId);
        var cart = cartData.IsNullOrEmpty ? null : JsonSerializer.Deserialize<ShoppingCart>(cartData);
        return cart;
    }

    public async Task<ShoppingCart> AddOrUpdateAsync(ShoppingCart cart)
    {
        var changed = await _database.StringSetAsync(cart.Id, JsonSerializer.Serialize(cart), TimeSpan.FromDays(30));

        return !changed ? null : await GetAsync(cart.Id);
    }

    public async Task<bool> DeleteAsync(string cartId)
    {
        return await _database.KeyDeleteAsync(cartId);
    }
}
