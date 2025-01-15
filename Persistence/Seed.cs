using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Activities.Any()) return;
            
            var activities = new List<Activity>
            {
                new Activity
                {
                    Title = "Business Networking Event",
                    Date = DateTime.Now.AddMonths(-2),
                    Description = "Professional networking event held two months ago",
                    Category = "Networking",
                    City = "London",
                    Venue = "City Pub",
                },
                new Activity
                {
                    Title = "Cultural Appreciation Evening",
                    Date = DateTime.Now.AddMonths(-1),
                    Description = "Cultural event held one month ago",
                    Category = "Culture",
                    City = "Paris",
                    Venue = "Louvre Museum",
                },
                new Activity
                {
                    Title = "Historical Exhibit Tour",
                    Date = DateTime.Now.AddMonths(1),
                    Description = "Upcoming historical exhibit tour in one month",
                    Category = "Culture",
                    City = "London",
                    Venue = "Natural History Museum",
                },
                new Activity
                {
                    Title = "Music Concert",
                    Date = DateTime.Now.AddMonths(2),
                    Description = "Music concert scheduled in two months",
                    Category = "Music",
                    City = "London",
                    Venue = "O2 Arena",
                },
                new Activity
                {
                    Title = "Social Evening Gathering",
                    Date = DateTime.Now.AddMonths(3),
                    Description = "Planned social gathering in three months",
                    Category = "Social",
                    City = "London",
                    Venue = "Popular Pub",
                },
                new Activity
                {
                    Title = "Executive Retreat",
                    Date = DateTime.Now.AddMonths(4),
                    Description = "Executive retreat planned in four months",
                    Category = "Retreat",
                    City = "London",
                    Venue = "Luxury Venue",
                },
                new Activity
                {
                    Title = "Corporate Mixer",
                    Date = DateTime.Now.AddMonths(5),
                    Description = "Corporate mixer event in five months",
                    Category = "Corporate",
                    City = "London",
                    Venue = "Downtown Pub",
                },
                new Activity
                {
                    Title = "Live Music Event",
                    Date = DateTime.Now.AddMonths(6),
                    Description = "Live music event in six months",
                    Category = "Music",
                    City = "London",
                    Venue = "Roundhouse Camden",
                },
                new Activity
                {
                    Title = "Thames River Excursion",
                    Date = DateTime.Now.AddMonths(7),
                    Description = "Past Thames River excursion",
                    Category = "Travel",
                    City = "London",
                    Venue = "River Thames",
                },
                new Activity
                {
                    Title = "Film Screening",
                    Date = DateTime.Now.AddMonths(8),
                    Description = "Future film screening event",
                    Category = "Film",
                    City = "London",
                    Venue = "Cinema Hall",
                }
            };

            await context.Activities.AddRangeAsync(activities);
            await context.SaveChangesAsync();
        }
    }
}
