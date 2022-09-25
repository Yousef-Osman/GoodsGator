using System.ComponentModel.DataAnnotations;

namespace GoodsGatorAPI.Models.IdentityEntities;

public class Address
{
    public Address()
    {
        Id = Guid.NewGuid().ToString();
    }

    [Key]
    public string Id { get; set; }
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

    [Required]
    public string AppUserId { get; set; }
    public AppUser AppUser { get; set; }
}
