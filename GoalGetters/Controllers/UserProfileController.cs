using Microsoft.AspNetCore.Mvc;

namespace GoalGetters.Controllers
{
    public class UserProfileController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
