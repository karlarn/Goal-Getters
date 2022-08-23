using GoalGetters.Models;
using GoalGetters.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;

namespace GoalGetters.Controllers
{
    // Specifies an attribute route on a controller
    [Route("api/[controller]")]
    // Indicates that a type and all derived types are used to serve HTTP API responses
    [ApiController]

    public class GoalUpdateController : ControllerBase
    {
        // private attribute of the controller
        private readonly IGoalUpdateRepository _goalUpdateRepository;

        // Class constructor
        public GoalUpdateController(IGoalUpdateRepository goalUpdateRepository)
        {
            _goalUpdateRepository = goalUpdateRepository;

        }

        // Post request for the controller that passes an update object sets the date to now and creates a new row in the goalupdate table 
        [HttpPost]
        public IActionResult Post(GoalUpdate update)
        {
            update.Timestamp = DateTime.Now;
            _goalUpdateRepository.Add(update);
            return NoContent();

        }


    }
}
