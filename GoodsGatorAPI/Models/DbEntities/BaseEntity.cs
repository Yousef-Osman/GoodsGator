using System.ComponentModel.DataAnnotations;

namespace GoodsGatorAPI.Models.DbEntities;

public class BaseEntity
{
    public BaseEntity()
    {
        CreatedOn = DateTime.Now;
        LastModifiedOn = DateTime.Now;
    }

    public DateTime CreatedOn { get; set; }
    public DateTime? LastModifiedOn { get; set; }
    public DateTime? DeletedOn { get; set; }
    public bool IsDeleted { get; set; } = false;
}
