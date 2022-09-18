using GoodsGatorAPI.Data;
using GoodsGatorAPI.Extensions;
using GoodsGatorAPI.Helpers.Pagination;
using GoodsGatorAPI.Models.DbEntities;
using GoodsGatorAPI.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GoodsGatorAPI.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly AppDbContext _context;

    public ProductRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Product> GetProductAsync(string id)
    {
        return await _context.Products.Include(a => a.Brand).Include(a => a.Category)
            .Where(a => a.IsDeleted == false).FirstOrDefaultAsync(a => a.Id == id);
    }

    public async Task<PagedList<Product>> GetProductsAsync(ProductParams productParams)
    {
        var query = _context.Products
            .Sort(productParams.OrderBy)
            .Search(productParams.SearchValue)
            .Filter(productParams.Brands, productParams.CategoryId)
            .Where(a => a.IsDeleted == false)
            .Include(a => a.Brand).Include(a => a.Category)
            .AsQueryable();

        return await PagedList<Product>.ToPagedListAsync(query, productParams.PageNumber, productParams.PageSize);
    }

    public async Task<Brand> GetBrandAsync(int id)
    {
        return await _context.Brands.Where(a => a.IsDeleted == false).FirstOrDefaultAsync(a => a.Id == id);
    }

    public async Task<IReadOnlyList<Brand>> GetBrandsAsync()
    {
        return await _context.Brands.Where(a => a.IsDeleted == false).ToListAsync();
    }

    public async Task<Category> GetCategoryAsync(int id)
    {
        return await _context.Categories.Where(a => a.IsDeleted == false).FirstOrDefaultAsync(a => a.Id == id);
    }

    public async Task<IReadOnlyList<Category>> GetCategoriesAsync()
    {
        return await _context.Categories.Where(a => a.IsDeleted == false).ToListAsync();
    }
}
