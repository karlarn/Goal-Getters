using System;
using System.ComponentModel.DataAnnotations;

// project name where all the files can be grouped together
namespace GoalGetters.Models
{
    // Scaffolding for a specific object if the property has required above it then the object can not be made with an empty value in that property.
    public class GoalUpdate
    {
        public int Id { get; set; }
        public int GoalId { get; set; }
        [Required]
        public DateTime Timestamp { get; set; }
        [Required]
        public string WhatHaveYouDone { get; set; }
    }
}
