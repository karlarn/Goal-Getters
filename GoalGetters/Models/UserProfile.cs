using System.ComponentModel.DataAnnotations;

namespace GoalGetters.Models
{
    // class for UserProfile object 
    public class UserProfile
    {
        // Properties, some are required to make this object, some have a max/min length setting, some require a specific structure like an email address. 
        public int Id { get; set; }

        [StringLength(28, MinimumLength = 28)]
        public string FirebaseUserId { get; set; }

        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [MaxLength(255)]
        public string Email { get; set; }

        public string FullName
        {
            get
            {
                return $"{FirstName} {LastName}";
            }
        }
    }
}