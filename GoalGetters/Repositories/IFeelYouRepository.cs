using GoalGetters.Models;
using GoalGetters.Utils;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

// groups files together in a single project 
namespace GoalGetters.Repositories
{
    // class for all the methods for opening to connections for the ifeelyou table 
    public class IFeelYouRepository : BaseRepository, IIFeelYouRepository
    {
        // consturctor that passes in a parameter that represents a set of key/value application configuration properties.
        public IFeelYouRepository(IConfiguration configuration) : base(configuration) { }

        // Returns a list of likes from a ifeelyou table in a db from opening a connection
        public List<IFeelYou> GetAllLikes()
        {
            List<IFeelYou> likes = new List<IFeelYou>();

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "Select * From IFeelYou";

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        IFeelYou like = new IFeelYou
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            GoalId = DbUtils.GetInt(reader, "GoalId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId")
                        };

                        likes.Add(like);
                    }
                    reader.Close();

                    return likes;

                }
            }

        }

        // Inserts a new row into the ifeelyou table of the db
        public void Add(IFeelYou like)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {

                    cmd.CommandText = @"INSERT INTO IFeelYou (GoalId, UserProfileId)
                                        VALUES (@goalId, @userProfileId)";

                    DbUtils.AddParameter(cmd, "@goalId", like.GoalId);
                    DbUtils.AddParameter(cmd, "@userProfileId", like.UserProfileId);


                    cmd.ExecuteScalar();
                }
            }
        }

        // deletes a specific row from the ifeelyou table in the db based on two different foreign keys 
        public void Delete(IFeelYou like)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM IFeelYou
                        WHERE UserProfileId = @userProfileId And GoalId = @goalId";

                    DbUtils.AddParameter(cmd, "@userProfileId", like.UserProfileId);
                    DbUtils.AddParameter(cmd, "@goalId", like.GoalId);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
