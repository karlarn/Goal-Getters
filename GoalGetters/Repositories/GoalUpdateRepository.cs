using GoalGetters.Models;
using GoalGetters.Utils;
using Microsoft.Extensions.Configuration;

namespace GoalGetters.Repositories
{
    public class GoalUpdateRepository : BaseRepository, IGoalUpdateRepository
    {
        // constructor 
        public GoalUpdateRepository(IConfiguration configuration) : base(configuration) { }

        // Creates a new row in the goalupdate table based on the model passed into the method 
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
