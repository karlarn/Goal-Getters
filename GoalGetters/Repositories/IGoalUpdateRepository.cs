using GoalGetters.Models;

namespace GoalGetters.Repositories
{
    // interface for the goalupdaterepo. all classes must have at least this method to be considered part of the interface
    public interface IGoalUpdateRepository
    {
        public void Add(GoalUpdate update);
    }
}
