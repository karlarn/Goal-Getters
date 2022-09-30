using GoalGetters.Models;
using GoalGetters.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Security.Claims;

namespace GoalGetters.Controllers
{
    // Specifies that the class or method that this attribute is applied to requires the specified authorization.
    [Authorize]
    // Specifies an attribute route on a controller.
    [Route("api/[controller]")]
    // Indicates that a type and all derived types are used to serve HTTP API responses.
    [ApiController]
    // Goal controller class that inherits atributed from the parent ControllerBase
    public class GoalController : ControllerBase
    {

        // Attributes
        private readonly IGoalRepository _goalRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        // Constructor
        public GoalController(IGoalRepository goalRepository, IUserProfileRepository userProfileRepository)
        {
            _goalRepository = goalRepository;
            _userProfileRepository = userProfileRepository;
        }

        // Listens for HTTP get requests of just the base route returns a response of a list of goal objects 
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_goalRepository.GetAllGoals());
        }

        // Listens for the http request api/goal/usergoals. Sets a currentuser sets a list of goals based on the current user id and returns that list 
        [HttpGet("UserGoals")]
        public IActionResult Get()
        {
            UserProfile currentUser = GetCurrentUserProfile();
            List<Goal> Goals = _goalRepository.GetAllGoalsById(currentUser.Id);
            if (Goals == null)
            {
                return NotFound();
            }
            else if (Goals.Count<1)
            {
                return BadRequest();
            }
            return Ok(Goals);
        }

        // Listens for api/goal/{the curly braces state this will be a unique number in the httprequest}. Returns a single specific goal based on the number in the http request as long as the object isnt empty and the logged in user the same as the user who made the goal the returned response will be a single goal.
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            UserProfile user = GetCurrentUserProfile();
            Goal goal = _goalRepository.GetGoalById(id);
            if (goal == null)
            {
                return NotFound();
            }
            else if (goal.UserProfileId != user.Id)
            {
                return BadRequest();
            }
            return Ok(goal);
        }

        // Http get that returns a single goal with a list of updates 
        [HttpGet("WithUpdates/{id}")]
        public IActionResult GetGoalAndUpdates(int id)
        {
            UserProfile user = GetCurrentUserProfile();
            Goal goal = _goalRepository.GetGoalWithUpdatesById(id);
            if (goal == null)
            {
                return NotFound();
            }
            else if (goal.UserProfileId != user.Id)
            {
                return BadRequest();
            }
            return Ok(goal);
        }

        // First post of the controller! Takes in a goal object from the request and makes a new instance of it in the database. response returns no information. 
        [HttpPost]
        public IActionResult Post(Goal goal)
        {
            UserProfile currentUser = GetCurrentUserProfile();
            goal.UserProfileId = currentUser.Id;
            goal.DateCreated = DateTime.Now;
            _goalRepository.Add(goal);
            return NoContent();

        }

        // First delete of the controller! Http delete request by a specific id. returns no information in the response
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _goalRepository.Delete(id);
            return NoContent();
        }

        // First put http request gets the id from the URl and a json goal object. after checking the id's of the goal against the url request update in goalrepository is called and changes the information of the specific goal row. Response returns nothing.
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

        // Second update of the controller. passes a specific id from an HTTP request to update a single column in the specific goal row. response of no information. 
        [HttpPut("Complete/{id}")]
        public IActionResult PutComplete(int id)
        {
            _goalRepository.UpdateCompletion(id);
            return NoContent();
        }

        // Private can only be used in this class. uses firebase to get the inforation of the logged in user.
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
