using GoalGetters.Models;
using System.Collections.Generic;

namespace GoalGetters.Repositories
{
    // interface for goalrepo. The repo must have all these methods to be considered part of the grouping
    public interface IGoalRepository
    {
        public void Add(Goal goal);
        public void Update(Goal goal);
        public List<Goal> GetAllGoals();
        public List<Goal> GetAllGoalsById(int id);
        public void Delete(int id);
        public Goal GetGoalById(int id);
        public void UpdateCompletion(int id);
        public Goal GetGoalWithUpdatesById(int id);

    }
}
