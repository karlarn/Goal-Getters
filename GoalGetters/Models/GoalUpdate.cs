using System;
using System.ComponentModel.DataAnnotations;

namespace GoalGetters.Models
{
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
