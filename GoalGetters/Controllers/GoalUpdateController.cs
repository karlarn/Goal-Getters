using GoalGetters.Models;
using GoalGetters.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;

namespace GoalGetters.Controllers
{
    // Specifies an attribute route on a controller
    [Route("api/[controller]")]
    // Indicates that a type and all derived types are used to serve HTTP API responses
    [ApiController]

    public class GoalUpdateController : ControllerBase
    {
        // Class constructor
        public GoalUpdateController(IGoalUpdateRepository goalUpdateRepository, IUserProfileRepository userProfileRepository)
        {
            _goalUpdateRepository = goalUpdateRepository;
            _userProfileRepository = userProfileRepository;
        } 
        
        // private attribute of the controller
        private readonly IGoalUpdateRepository _goalUpdateRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        // Post request for the controller that passes an update object sets the date to now and creates a new row in the goalupdate table 
        [HttpPost]
        public IActionResult Post(GoalUpdate update)
        {
            update.Timestamp = DateTime.Now;
            _goalUpdateRepository.Add(update);
            return NoContent();

        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }


    }
}
