﻿namespace GoodsGatorAPI.Models.RedisEntities;

public class BasketItem
{
    public int Id { get; set; }
    public string ProductName { get; set; }
    public double Price { get; set; }
    public int Quantity { get; set; }
    public string ImageUrl { get; set; }
    public string Brand { get; set; }
    public string Category { get; set; }
}
