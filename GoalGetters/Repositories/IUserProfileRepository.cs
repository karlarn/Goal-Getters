using GoalGetters.Models;

namespace GoalGetters.Repositories
{
    // insterface for UserProfileRepo. Must have these to methods in the class to be part of this interface
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
    }
}