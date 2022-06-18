using GoodsGatorAPI.Models.DbEntities;
using System.Linq.Expressions;

namespace GoodsGatorAPI.Specifications;

public class ProductWithCategoryAndBrandSpec : BaseSpecification<Product>
{
    public ProductWithCategoryAndBrandSpec(): base(x => x.IsDeleted == false)
    {
        AddInclude(x => x.Brand);
        AddInclude(x => x.Category);
    }

    public ProductWithCategoryAndBrandSpec(string id) : base(x => x.Id == id && x.IsDeleted == false)
    {
        AddInclude(x => x.Brand);
        AddInclude(x => x.Category);
    }
}
