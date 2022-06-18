using GoodsGatorAPI.Data;
using GoodsGatorAPI.Models.DbEntities;
using GoodsGatorAPI.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GoodsGatorAPI.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly ApplicationDbContext _context;

    public ProductRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Product> GetProductAsync(string id)
    {
        return await _context.Products.Include(a => a.Brand).Include(a => a.Category)
            .Where(a => a.IsDeleted == false).FirstOrDefaultAsync(a => a.Id == id);
    }

    public async Task<IReadOnlyList<Product>> GetProductsAsync()
    {
        return await _context.Products.Include(a=>a.Brand).Include(a=>a.Category)
            .Where(a => a.IsDeleted == false).ToListAsync();
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
