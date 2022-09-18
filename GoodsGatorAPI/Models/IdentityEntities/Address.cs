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
    public string City { get; set; }
    public string Governorate { get; set; }
    public string Country { get; set; }

    [Required]
    public string AppUserId { get; set; }
    public AppUser AppUser { get; set; }
}
