using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

// Groups together all the files for this specific project
namespace GoalGetters.Models
{
    // Blueprint for a goal object 
    public class Goal
    {
        // Properties to an object if the property has required the object can not be created without that property having a value. This class also has a list of objects attached to it. 
        public int Id { get; set; }
        public int UserProfileId { get; set; }
        [Required]
        public string GoalToMeet { get; set; }
        [Required]
        public int DifficultyLevelId { get; set; }
        public DateTime DateCreated { get; set; }
        [Required]
        public DateTime ExpectedCompletionDate { get; set; }
        public string WorstCaseScenario { get; set; }
        public DateTime CompletionDate { get; set; }
        public DifficultyLevel DifficultyLevel { get; set; }
        public UserProfile UserProfile { get; set; }
        public List<GoalUpdate> GoalUpdates { get; set; }
        public List<IFeelYou> Likes { get; set; }
    }
}
