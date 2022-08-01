using GoalGetters.Models;
using GoalGetters.Utils;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace GoalGetters.Repositories
{
    public class IFeelYouRepository : BaseRepository, IIFeelYouRepository
    {
        public IFeelYouRepository(IConfiguration configuration) : base(configuration) { }

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
