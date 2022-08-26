using GoalGetters.Models;
using System.Collections.Generic;

namespace GoalGetters.Repositories
{
    // interface for DifficultyLevelRepository must have matching methods in the repo to be part of this party
    public interface IDifficultyLevelRepository
    {
        public List<DifficultyLevel> GetAllDifficultyLevels();
    }
}
