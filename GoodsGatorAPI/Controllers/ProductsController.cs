using AutoMapper;
using GoodsGatorAPI.Extensions;
using GoodsGatorAPI.Helpers.Errors;
using GoodsGatorAPI.Helpers.Pagination;
using GoodsGatorAPI.Models.DbEntities;
using GoodsGatorAPI.Models.DTOs;
using GoodsGatorAPI.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GoodsGatorAPI.Controllers;
[Route("api/[controller]")]
[ApiController]
public class ProductsController : ControllerBase
{
    private readonly IProductRepository _productRepo;
    private readonly IGenericRepository<Brand> _brandRepo;
    private readonly IGenericRepository<Category> _categoryRepo;
    private readonly IMapper _mapper;

    public ProductsController(IProductRepository productRepo,
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
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetProductAsync(string id)
    {
        var product = await _productRepo.GetProductAsync(id);

        if (product == null)
            return NotFound(new ApiResponse(404));

        return Ok(_mapper.Map<Product, ProductDTO>(product));
    }

    [HttpGet]
    public async Task<IActionResult> GetProductsAsync([FromQuery] ProductParams productParams)
    {
        var products = await _productRepo.GetProductsAsync(productParams);
        Response.AddPaginationHeaders(products.MetaData);
        var productsDto = _mapper.Map<PagedList<Product>, IReadOnlyList<ProductDTO>>(products);

        return Ok(productsDto);
    }

    [HttpGet("Brands/{id}")]
    public async Task<IActionResult> GetBrandAsync(int id)
    {
        var brand = await _brandRepo.GetByIdAsync(id);
        if (brand == null || brand.IsDeleted)
            return NotFound(new ApiResponse(404));

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
            return NotFound(new ApiResponse(404));

        return Ok(category);
    }

    [HttpGet("Categories")]
    public async Task<IActionResult> GetCategoriesAsync()
    {
        return Ok(await _categoryRepo.GetAllAsync());
    }
}
