using GoalGetters.Models;
using System.Collections.Generic;

namespace GoalGetters.Repositories
{
    public interface IDifficultyLevelRepository
    {
        public List<DifficultyLevel> GetAllDifficultyLevels();
    }
}
