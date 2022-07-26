using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using GoalGetters.Repositories;
using GoalGetters.Models;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using System.Security.Claims;
using System;

namespace GoalGetters.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class GoalController : ControllerBase
    {
        private readonly IGoalRepository _goalRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public GoalController(IGoalRepository goalRepository, IUserProfileRepository userProfileRepository)
        {
            _goalRepository = goalRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_goalRepository.GetAllGoals());
        }

        [HttpGet("UserGoals")]
        public IActionResult Get()
        {
            UserProfile currentUser = GetCurrentUserProfile();
            List<Goal> Goals = _goalRepository.GetAllGoalsById(currentUser.Id);
            if (Goals == null)
            {
                return NotFound();
            }
            return Ok(Goals);
        }

        [HttpPost]
        public IActionResult Post(Goal goal)
        {
            UserProfile currentUser = GetCurrentUserProfile();
            goal.UserProfileId = currentUser.Id;
            goal.DateCreated = DateTime.Now;
            _goalRepository.Add(goal);
            return NoContent();

        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _goalRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Goal goal)
        {
            if (id != goal.Id)
            {
                return BadRequest();
            }

            _goalRepository.Update(goal);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
