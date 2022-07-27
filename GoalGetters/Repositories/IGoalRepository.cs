using GoalGetters.Models;
using System.Collections.Generic;

namespace GoalGetters.Repositories
{
    public interface IGoalRepository
    {
        public void Add(Goal goal);
        public void Update(Goal goal);
        public List<Goal> GetAllGoals();
        public List<Goal> GetAllGoalsById(int id);
        public void Delete(int id);
        public Goal GetGoalById(int id);

    }
}
