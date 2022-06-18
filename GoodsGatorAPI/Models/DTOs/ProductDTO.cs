using System.ComponentModel.DataAnnotations;

namespace GoodsGatorAPI.Models.DTOs;

public class ProductDTO
{
    public string Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public string Description { get; set; }
    [Required]
    public double Price { get; set; }
    public string ImageUrl { get; set; }

    public string Brand { get; set; }
    public string Category { get; set; }
}
