using System.ComponentModel.DataAnnotations;

namespace GoodsGatorAPI.Models.DTOs;

public class AddressDTO
{
    [Required]
    public string FullAddress { get; set; }
    [Required]
    public string Street { get; set; }
    [Required]
    public string City { get; set; }
    [Required]
    public string Governorate { get; set; }
    [Required]
    public string Country { get; set; }
    [Required]
    public string ZipCode { get; set; }
}
