using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GoalGetters.Models
{
    public class Goal
    {
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
