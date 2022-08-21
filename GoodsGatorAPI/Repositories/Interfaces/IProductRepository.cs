using GoodsGatorAPI.Helpers.Pagination;
using GoodsGatorAPI.Models.DbEntities;

namespace GoodsGatorAPI.Repositories.Interfaces;

public interface IProductRepository
{
    Task<Product> GetProductAsync(string id); 
    Task<PagedList<Product>> GetProductsAsync(ProductParams productParams);
    Task<Brand> GetBrandAsync(int id);
    Task<IReadOnlyList<Brand>> GetBrandsAsync();
    Task<Category> GetCategoryAsync(int id);
    Task<IReadOnlyList<Category>> GetCategoriesAsync();
}
