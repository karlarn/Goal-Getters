using GoalGetters.Models;
using GoalGetters.Utils;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace GoalGetters.Repositories
{
    public class DifficultyLevelRepository : BaseRepository, IDifficultyLevelRepository
    {
        public DifficultyLevelRepository(IConfiguration configuration) : base(configuration) { }

        public List<DifficultyLevel> GetAllDifficultyLevels()
        {
            List<DifficultyLevel> DLs = new List<DifficultyLevel>();

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "Select * From DifficultyLevel";

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        DifficultyLevel level = new DifficultyLevel
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name")
                        };

                        DLs.Add(level);
                    }
                    reader.Close();

                    return DLs;

                }
            }

        }
    }
}
