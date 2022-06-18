using System.ComponentModel.DataAnnotations;

namespace GoodsGatorAPI.Models.DbEntities;

public class Brand : BaseEntity
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
}
