using GoodsGatorAPI.Models.DbEntities;

namespace GoodsGatorAPI.Extensions;

public static class ProductExtensions
{
    public static IQueryable<Product> Sort(this IQueryable<Product> query, string orderBy)
    {
        if (string.IsNullOrWhiteSpace(orderBy))
            return query.OrderByDescending(a => a.LastModifiedOn);

        query = orderBy switch
        {
            "Name" => query.OrderBy(a => a.Name),
            "NameDesc" => query.OrderByDescending(a => a.Name),
            "Price" => query.OrderBy(a => a.Price),
            "PriceDesc" => query.OrderByDescending(a => a.Price),
            _ => query.OrderByDescending(a => a.LastModifiedOn)
        };

        return query;
    }

    public static IQueryable<Product> Search(this IQueryable<Product> query, string searchValue)
    {
        if (string.IsNullOrWhiteSpace(searchValue))
            return query;

        searchValue = searchValue.ToLower().Trim();

        return query.Where(a => a.Name.ToLower().Contains(searchValue));
    }

    public static IQueryable<Product> Filter(this IQueryable<Product> query, List<int> brands, List<int> categories)
    {
        if (categories.Count > 0)
            query = query.Where(a => categories.Contains(a.Category.Id));

        if (brands.Count > 0)
            query = query.Where(a => brands.Contains(a.Brand.Id));

        return query;
    }
}
