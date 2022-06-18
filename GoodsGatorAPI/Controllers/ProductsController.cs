using AutoMapper;
using GoodsGatorAPI.Models.DbEntities;
using GoodsGatorAPI.Models.DTOs;
using GoodsGatorAPI.Repositories.Interfaces;
using GoodsGatorAPI.Specifications;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GoodsGatorAPI.Controllers;
[Route("api/[controller]")]
[ApiController]
public class ProductsController : ControllerBase
{
    private readonly IGenericRepository<Product> _productRepo;
    private readonly IGenericRepository<Brand> _brandRepo;
    private readonly IGenericRepository<Category> _categoryRepo;
    private readonly IMapper _mapper;

    public ProductsController(IGenericRepository<Product> productRepo,
                              IGenericRepository<Brand> brandRepo,
                              IGenericRepository<Category> CategoryRepo,
                              IMapper mapper)
    {
        _productRepo = productRepo;
        _brandRepo = brandRepo;
        _categoryRepo = CategoryRepo;
        _mapper = mapper;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetProductAsync(string id)
    {
        var spec = new ProductWithCategoryAndBrandSpec(id);
        var product = await _productRepo.GetEntityWithSpecAsync(spec);

        if (product == null)
            return NotFound();

        return Ok(_mapper.Map<Product, ProductDTO>(product));
    }

    [HttpGet]
    public async Task<IActionResult> GetProductsAsync()
    {
        var spec = new ProductWithCategoryAndBrandSpec();
        var products = await _productRepo.GetAllWithSpecAsync(spec);
        return Ok(_mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductDTO>>(products));
    }

    [HttpGet("Brands/{id}")]
    public async Task<IActionResult> GetBrandAsync(int id)
    {
        var brand = await _brandRepo.GetByIdAsync(id);
        if (brand == null || brand.IsDeleted)
            return NotFound();

        return Ok(brand);
    }

    [HttpGet("Brands")]
    public async Task<IActionResult> GetBrandsAsync()
    {
        return Ok(await _brandRepo.GetAllAsync());
    }

    [HttpGet("Categories/{id}")]
    public async Task<IActionResult> GetProductCategoryAsync(int id)
    {
        var category = await _categoryRepo.GetByIdAsync(id);

        if (category == null || category.IsDeleted)
            return NotFound();

        return Ok(category);
    }

    [HttpGet("Categories")]
    public async Task<IActionResult> GetCategoriesAsync()
    {
        return Ok(await _categoryRepo.GetAllAsync());
    }
}
