using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using GoalGetters.Models;
using GoalGetters.Utils;

namespace GoalGetters.Repositories
{
    public class GoalRepository: BaseRepository, IGoalRepository
    {
        public GoalRepository(IConfiguration configuration) : base(configuration) { }

        public void Add(Goal goal)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {

                    cmd.CommandText = @"INSERT INTO Goal (UserProfileId, GoalToMeet, DateCreated, DifficultyLevelId, ExpectedCompletionDate, WorstCaseSenario)
                                        VALUES (@userProfileId, @goalToMeet, @dateCreated, @difficultyLevelId, @expectedCompletionDate, @worstCaseScenario)";

                    DbUtils.AddParameter(cmd, "@userProfileId", goal.UserProfileId);
                    DbUtils.AddParameter(cmd, "@goalToMeet", goal.GoalToMeet);
                    DbUtils.AddParameter(cmd, "@dateCreated", goal.DateCreated);
                    DbUtils.AddParameter(cmd, "@difficultyLevelId", goal.DifficultyLevelId);
                    DbUtils.AddParameter(cmd, "@expectedCompletionDate", goal.ExpectedCompletionDate);
                    DbUtils.AddParameter(cmd, "@worstCaseScenario", goal.WorstCaseScenario);


                    cmd.ExecuteScalar();
                }
            }
        }

        public List<Goal> GetAllGoals()
        {
            List<Goal> goals = new List<Goal>();

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Select g.Id, g.UserProfileId, g.GoalToMeet, g.DifficultyLevelId, g.DateCreated, g.ExpectedCompletionDate, g.WorstCaseSenario, g.CompletionDate,
                                        dl.Name,
                                        up.FirstName, up.LastName
                                        From Goal g
                                        Left Join DifficultyLevel dl on dl.Id = g.DifficultyLevelId
                                        Left Join UserProfile up on up.Id = g.UserProfileId
                                        Order By DateCreated Desc";

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Goal goal = new Goal
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            GoalToMeet = DbUtils.GetString(reader, "GoalToMeet"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            DifficultyLevelId = DbUtils.GetInt(reader, "DifficultyLevelId"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                            ExpectedCompletionDate = DbUtils.GetDateTime(reader, "ExpectedCompletionDate"),
                            CompletionDate = (System.DateTime)DbUtils.GetNullableDateTime(reader, "CompletionDate"),
                            DifficultyLevel = new DifficultyLevel
                            {
                                Id = DbUtils.GetInt(reader, "DifficultyLevelId"),
                                Name = DbUtils.GetString(reader, "Name"),
                            },
                            UserProfile = new UserProfile
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName")
                            }
                        };
                        if (DbUtils.GetString(reader, "WorstCaseScenario") != null)
                        {
                            goal.WorstCaseScenario = DbUtils.GetString(reader, "WorstCaseSenario");
                        }
         
                        goals.Add(goal);
                    }
                    reader.Close();

                    return goals;

                }
            }

        }

        public List<Goal> GetAllGoalsById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Select g.Id, g.UserProfileId, g.GoalToMeet, g.DifficultyLevelId, g.DateCreated, g.ExpectedCompletionDate, g.WorstCaseSenario, g.CompletionDate,
                                        dl.Name,
                                        up.FirstName, up.LastName
                                        From Goal g
                                        Left Join DifficultyLevel dl on dl.Id = g.DifficultyLevelId
                                        Left Join UserProfile up on up.Id = g.UserProfileId
                                        Where g.UserProfileId = @id
                                        Order By DateCreated Desc";
                    cmd.Parameters.AddWithValue("@id", id);
                    using (var reader = cmd.ExecuteReader())
                    {
                        List<Goal> goals = new List<Goal>();
                        while (reader.Read())
                        {
                            Goal goal = new Goal()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                GoalToMeet = DbUtils.GetString(reader, "GoalToMeet"),
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                                DifficultyLevelId = DbUtils.GetInt(reader, "DifficultyLevelId"),
                                DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                                ExpectedCompletionDate = DbUtils.GetDateTime(reader, "ExpectedCompletionDate"),
                                CompletionDate = (System.DateTime)DbUtils.GetNullableDateTime(reader, "CompletionDate"),
                                DifficultyLevel = new DifficultyLevel
                                {
                                    Id = DbUtils.GetInt(reader, "DifficultyLevelId"),
                                    Name = DbUtils.GetString(reader, "Name"),
                                },
                                UserProfile = new UserProfile
                                {
                                    Id = DbUtils.GetInt(reader, "UserProfileId"),
                                    FirstName = DbUtils.GetString(reader, "FirstName"),
                                    LastName = DbUtils.GetString(reader, "LastName")
                                }

                            };
                            if (DbUtils.GetString(reader, "WorstCaseScenario") != null)
                            {
                                goal.WorstCaseScenario = DbUtils.GetString(reader, "WorstCaseSenario");
                            }
                            goals.Add(goal);

                        }
                        return goals;
                    }
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM Goal
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(Goal goal)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Goal
                        SET
                            GoalToMeet = @goalToMeet,
                            DifficultyLevelId = @difficultyLevelId,
                            ExpectedCompletionDate = @expectedCompletionDate,
                            WorstCaseSenario = @worstCaseScenario,
                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@goalToMeet", goal.GoalToMeet);
                    cmd.Parameters.AddWithValue("@difficultyLevelId", goal.DifficultyLevelId);
                    cmd.Parameters.AddWithValue("@worstCaseScenario", DbUtils.ValueOrDBNull(goal.WorstCaseScenario));
                    cmd.Parameters.AddWithValue("@categoryId", goal.ExpectedCompletionDate);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
