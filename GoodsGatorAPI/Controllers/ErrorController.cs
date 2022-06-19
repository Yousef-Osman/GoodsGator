using GoodsGatorAPI.Helpers.Errors;
using Microsoft.AspNetCore.Mvc;

namespace GoodsGatorAPI.Controllers;
[Route("error/{code}")]
//[ApiController]
//[ApiExplorerSettings(IgnoreApi = true)]
public class ErrorController : ControllerBase
{
    public IActionResult Error(int statusCode)
    {
        return new ObjectResult(new ApiResponse(statusCode));
    }    
}
