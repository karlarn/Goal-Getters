using GoalGetters.Models;
using GoalGetters.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace GoalGetters.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class IFeelYouController : ControllerBase
    {
        private readonly IIFeelYouRepository _iFeelYouRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public IFeelYouController(IIFeelYouRepository iFeelYouRepository, IUserProfileRepository userProfileRepository)
        {
            _iFeelYouRepository = iFeelYouRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_iFeelYouRepository.GetAllLikes());
        }

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

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

    }
}
