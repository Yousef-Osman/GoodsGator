using GoodsGatorAPI.Models.RedisEntities;
using GoodsGatorAPI.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GoodsGatorAPI.Controllers;
[Route("api/[controller]")]
[ApiController]
public class BasketController : ControllerBase
{
    private readonly IBasketRepository _basketRepository;

    public BasketController(IBasketRepository basketRepository)
    {
        _basketRepository = basketRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetBasketAsync(string id)
    {
        var basket = await _basketRepository.GetAsync(id);
        return Ok(basket ?? new Basket(id));
    }

    [HttpPost]
    public async Task<IActionResult> AddOrUpdateBasketAsync(Basket basket)
    {
        var dbBasket = await _basketRepository.AddOrUpdateAsync(basket);
        return Ok(dbBasket);
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteBasketAsync(string id)
    {
        return Ok(await _basketRepository.DeleteAsync(id));
    }
}
