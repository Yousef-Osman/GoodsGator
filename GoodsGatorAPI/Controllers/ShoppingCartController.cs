using GoodsGatorAPI.Models.RedisEntities;
using GoodsGatorAPI.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GoodsGatorAPI.Controllers;
[Route("api/[controller]")]
[ApiController]
public class ShoppingCartController : ControllerBase
{
    private readonly IShoppingCartRepository _shoppingCartRepository;

    public ShoppingCartController(IShoppingCartRepository shoppingCartRepository)
    {
        _shoppingCartRepository = shoppingCartRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetCartAsync(string id)
    {
        var cart = await _shoppingCartRepository.GetAsync(id);
        return Ok(cart ?? new ShoppingCart(id));
    }

    [HttpPost]
    public async Task<IActionResult> AddOrUpdateCartAsync(ShoppingCart cart)
    {
        var dbCart = await _shoppingCartRepository.AddOrUpdateAsync(cart);
        return Ok(dbCart);
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteCartAsync(string id)
    {
        return Ok(await _shoppingCartRepository.DeleteAsync(id));
    }
}
