using GoodsGatorAPI.Data;
using GoodsGatorAPI.Helpers.Errors;
using GoodsGatorAPI.Models.DbEntities;
using Microsoft.AspNetCore.Mvc;

namespace GoodsGatorAPI.Controllers;
[Route("api/[controller]")]
[ApiController]
public class ErrorTestingController : ControllerBase
{
    private readonly AppDbContext _context;

    public ErrorTestingController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("NotFound/{id}")]
    public IActionResult GetNotFound(int id)
    {
        return NotFound(new ApiResponse(404));
    }

    [HttpGet("BadRequest")]
    public IActionResult GetBadRequest()
    {
        return BadRequest(new ApiResponse(400));
    }

    [HttpGet("ValidationRequest")]
    public IActionResult GetBadRequestId(int id, int num)
    {
        return Ok("ValidationRequest works");
    }

    [HttpGet("InternalError")]
    public IActionResult GetInternalError()
    {
        Product product = _context.Products.Find(110);
        var str = product.ToString();

        return Ok(str);
    }
}
