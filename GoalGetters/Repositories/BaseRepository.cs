using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace GoalGetters.Repositories
{
    // Abstract can not be instantiated but can be subclassed. Other repositories inherit this class as a parent
    public abstract class BaseRepository
    {
        // properties
        private readonly string _connectionString;

        // constructor uses the microsoft extension library to set the property of _connectionString to the default connection. 
        public BaseRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        // Represents a connection to a SQL Server database. This class cannot be inherited
        protected SqlConnection Connection
        {
            get
            {
                return new SqlConnection(_connectionString);
            }
        }
    }
}