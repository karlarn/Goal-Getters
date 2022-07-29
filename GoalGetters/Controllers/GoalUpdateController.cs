using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using GoalGetters.Repositories;
using GoalGetters.Models;
using System;

namespace GoalGetters.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoalUpdateController : ControllerBase
    {
        private readonly IGoalUpdateRepository _goalUpdateRepository;
        

        public GoalUpdateController(IGoalUpdateRepository goalUpdateRepository)
        {
            _goalUpdateRepository = goalUpdateRepository;
            
        }

        [HttpPost]
        public IActionResult Post( GoalUpdate update)
        {
            update.Timestamp = DateTime.Now;
            _goalUpdateRepository.Add(update);
            return NoContent();

        }

        
    }
}
