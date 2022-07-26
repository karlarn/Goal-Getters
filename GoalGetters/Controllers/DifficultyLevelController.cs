using GoalGetters.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GoalGetters.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DifficultyLevelController : ControllerBase
    {
        private readonly IDifficultyLevelRepository _difficultyLevelRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public DifficultyLevelController(IDifficultyLevelRepository difficultyLevelRepository, IUserProfileRepository userProfileRepository)
        {
            _difficultyLevelRepository = difficultyLevelRepository;
            _userProfileRepository = userProfileRepository;
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_difficultyLevelRepository.GetAllDifficultyLevels());
        }
    }
}
