using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using GoalGetters.Models;
using GoalGetters.Utils;

namespace GoalGetters.Repositories
{
    public class GoalUpdateRepository: BaseRepository, IGoalUpdateRepository
    {
        public GoalUpdateRepository(IConfiguration configuration) : base(configuration) { }
    }
}
