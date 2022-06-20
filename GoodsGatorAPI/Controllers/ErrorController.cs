using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using GoodsGatorAPI.Helpers.Errors;

namespace GoodsGatorAPI.Controllers;
[Route("errors/{code}")]
[ApiExplorerSettings(IgnoreApi = true)]
public class ErrorController : ControllerBase
{
    public IActionResult Error(int code)
    {
        return new ObjectResult(new ApiResponse(code));
    }
}
