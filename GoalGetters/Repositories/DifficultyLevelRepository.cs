using GoalGetters.Models;
using GoalGetters.Utils;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace GoalGetters.Repositories
{
    // child class of baseRepository, IDifficultyLevelRepository interface
    public class DifficultyLevelRepository : BaseRepository, IDifficultyLevelRepository
    {
        // constructor sets the base parent method with the microsoft library config
        public DifficultyLevelRepository(IConfiguration configuration) : base(configuration) {}

        // method in the class that returns a list of difficulty levels by opening a SQL connection and parsing a series of rows into models before addind them to the list 
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
