using Microsoft.AspNetCore.Mvc;

namespace GoodsGatorAPI.Controllers;
public class HomeController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}
