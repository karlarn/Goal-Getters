using GoalGetters.Models;
using GoalGetters.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

// Grouping of files in a project space
namespace GoalGetters.Controllers
{
    // Requires authorization 
    [Authorize]
    //Listens for HTTP requests by the name of this controller (IFeelYou)
    [Route("api/[controller]")]
    // The classes in this file are for listening for HTTP Requests
    [ApiController]
    // Child class of the controller parent by means of inheritance
    public class IFeelYouController : ControllerBase
    {
        // Private read only properties of the class set by the constructor below 
        private readonly IIFeelYouRepository _iFeelYouRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        // Class constructor
        public IFeelYouController(IIFeelYouRepository iFeelYouRepository, IUserProfileRepository userProfileRepository)
        {
            _iFeelYouRepository = iFeelYouRepository;
            _userProfileRepository = userProfileRepository;
        }

        // Listens for a base http get request returns a list of all likes in the DB
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_iFeelYouRepository.GetAllLikes());
        }

        // Listens for an HTTP post with a specific Id in it. a like is created with it using an IFeelYou model and a new row is created in the IFeelYou table. Nothing is sent back in the reponse 
        [HttpPost("{id}")]
        public IActionResult Post(int id)
        {
            UserProfile currentUser = GetCurrentUserProfile();
            IFeelYou like = new IFeelYou
            {
                UserProfileId = currentUser.Id,
                GoalId = id
            };
            _iFeelYouRepository.Add(like);
            return NoContent();
        }

        // This needs to be fixed. Shouldnt have to make a model to delete a row from table need to check to make sure the logged in user matches then I can just push an id instead of an object. 
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            IFeelYou like = new IFeelYou
            {
                GoalId = id,
                UserProfileId = GetCurrentUserProfile().Id
            };
            _iFeelYouRepository.Delete(like);
            return NoContent();
        }

        // Private can only be used in the class returns the object of a logged in user
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

    }
}
