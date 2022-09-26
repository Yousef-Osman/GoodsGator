using System.ComponentModel.DataAnnotations;

namespace GoodsGatorAPI.Models.DTOs;

public class CartItemDTO
{
    [Required]
    public string Id { get; set; }
    [Required]
    public string ProductName { get; set; }
    [Required]
    public double Price { get; set; }
    [Required, Range(1, int.MaxValue, ErrorMessage = "Quantity should be at least 1")]
    public int Quantity { get; set; }
    [Required]
    public string ImageUrl { get; set; }
    [Required]
    public string Brand { get; set; }
    [Required]
    public string Category { get; set; }
}
