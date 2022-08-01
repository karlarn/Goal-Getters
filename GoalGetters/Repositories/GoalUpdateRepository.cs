using GoalGetters.Models;
using GoalGetters.Utils;
using Microsoft.Extensions.Configuration;

namespace GoalGetters.Repositories
{
    public class GoalUpdateRepository : BaseRepository, IGoalUpdateRepository
    {
        public GoalUpdateRepository(IConfiguration configuration) : base(configuration) { }

        public void Add(GoalUpdate update)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {

                    cmd.CommandText = @"INSERT INTO GoalUpdate (GoalId, WhatHaveYouDone, Timestamp)
                                        VALUES (@goalId, @whatHaveYouDone, @timestamp)";

                    DbUtils.AddParameter(cmd, "@goalId", update.GoalId);
                    DbUtils.AddParameter(cmd, "@whatHaveYouDone", update.WhatHaveYouDone);
                    DbUtils.AddParameter(cmd, "@timestamp", update.Timestamp);


                    cmd.ExecuteScalar();
                }
            }
        }
    }
}
