using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

// This file can have multiple projects 

// Collection of related classes
namespace GoalGetters
{
    // Container for C# code usually named after the file name 
    public class Program
    {
        // A method, "Void" Means it doesnt return anything. 
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

// Method, ihostbuilder is an interface in the library imported above 
        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
