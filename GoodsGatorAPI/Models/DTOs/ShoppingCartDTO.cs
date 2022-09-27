namespace GoodsGatorAPI.Models.DTOs;

public class ShoppingCartDTO
{
    public string Id { get; set; }
    public List<CartItemDTO> Items { get; set; }
}
