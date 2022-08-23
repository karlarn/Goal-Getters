using GoalGetters.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GoalGetters.Controllers
{
    // Specifies that the class or method that this attribute is applied to requires the specified authorization.
    [Authorize]
    // Specifies an attribute route on a controller.
    [Route("api/[controller]")]
    // Indicates that a type and all derived types are used to serve HTTP API responses.
    [ApiController]
    public class DifficultyLevelController : ControllerBase
    {
        // Property only to be used inside the class and is read only 
        private readonly IDifficultyLevelRepository _difficultyLevelRepository;
        // Same
        private readonly IUserProfileRepository _userProfileRepository;

        // Constructor for the class
        public DifficultyLevelController(IDifficultyLevelRepository difficultyLevelRepository, IUserProfileRepository userProfileRepository)
        {
            _difficultyLevelRepository = difficultyLevelRepository;
            _userProfileRepository = userProfileRepository;
        }
        // HTTP get for api/DifficultyLevel (Name of the controller)
        // Calls difficultylevelrepository class and returns a response of an array of difficulty levels 
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_difficultyLevelRepository.GetAllDifficultyLevels());
        }
    }
}
