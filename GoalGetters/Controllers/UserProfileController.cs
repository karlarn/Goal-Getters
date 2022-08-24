using GoalGetters.Models;
using GoalGetters.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace GoalGetters.Controllers
{
    // Listens for api calls with the name of the controller class 
    [Route("api/[controller]")]
    // The below classes are controllers for API Http requests
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        // Private properties
        private readonly IUserProfileRepository _userProfileRepository;
        // Class constructor
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }

        // Http get request listener the request will have a string parameter in the request that is passed into the IActionResult that returns a user profile object from a userprofile table 
        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_userProfileRepository.GetByFirebaseUserId(firebaseUserId));
        }

        // Checks if a fbuser id is in the userprofile table if it is the request gets a return of ok otherwise it returns not found.   
        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var userProfile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok();
        }

        // creates a new row in the userprofile table 
        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserId = userProfile.FirebaseUserId },
                userProfile);
        }

        // returns a user profile based on the logged in user information
        [HttpGet]
        public IActionResult Get()
        {
            UserProfile up = new UserProfile
            {
                Id = GetCurrentUserProfile().Id
            };
            return Ok(up);
        }

        // private only used in the methods of this class to return a logged in user profile 
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}