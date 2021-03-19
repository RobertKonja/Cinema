namespace Cinema.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Cinema.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Cinema.Models.ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data.

            context.Users.AddOrUpdate(x => x.Id,

                new Models.User() { Id = 1, UserName = "Jon", Password = "Password.123", RegDate = new DateTime(2021, 01, 01, 10, 0, 0), Role = "user" },
                new Models.User() { Id = 2, UserName = "Smith", Password = "Password.123", RegDate = new DateTime(2021, 01, 01, 15, 0, 0), Role = "user" },
                new Models.User() { Id = 3, UserName = "Boss", Password = "Password.1234", RegDate = new DateTime(2021, 01, 01, 6, 30, 0), Role = "admin" }

                );
            context.SaveChanges();

            context.Halls.AddOrUpdate(x => x.Id,
                new Models.Hall() { Id = 1, Name = "Hall1" },
                new Models.Hall() { Id = 2, Name = "Hall2" },
                new Models.Hall() { Id = 3, Name = "Hall3" }
                );

            context.SaveChanges();

            context.ProjectionTypes.AddOrUpdate(x => x.Id,
                new Models.ProjectionType() { Id = 1, Name = "2D" },
                new Models.ProjectionType() { Id = 2, Name = "3D" },
                new Models.ProjectionType() { Id = 3, Name = "4D" }
                );

            context.SaveChanges();


            context.HallProjectionTypes.AddOrUpdate(x => x.Id,
                new Models.HallProjectionType() { Id = 1, HallId = 1, ProjectionTypeId = 1 },
                new Models.HallProjectionType() { Id = 2, HallId = 1, ProjectionTypeId = 2 },
                new Models.HallProjectionType() { Id = 3, HallId = 2, ProjectionTypeId = 1 },
                new Models.HallProjectionType() { Id = 4, HallId = 2, ProjectionTypeId = 3 },
                new Models.HallProjectionType() { Id = 5, HallId = 3, ProjectionTypeId = 3 }

                );
            context.SaveChanges();

            context.Seats.AddOrUpdate(x => x.Id,
                new Models.Seat() { Id = 1, SeatNumber = "A1", HallId = 1 },
                new Models.Seat() { Id = 2, SeatNumber = "A2", HallId = 1 },
                new Models.Seat() { Id = 3, SeatNumber = "A3", HallId = 1 },
                new Models.Seat() { Id = 4, SeatNumber = "A4", HallId = 1 },
                new Models.Seat() { Id = 5, SeatNumber = "A5", HallId = 1 },
                new Models.Seat() { Id = 5, SeatNumber = "B1", HallId = 1 },
                new Models.Seat() { Id = 6, SeatNumber = "B2", HallId = 1 },
                new Models.Seat() { Id = 7, SeatNumber = "B3", HallId = 1 },
                new Models.Seat() { Id = 8, SeatNumber = "B4", HallId = 1 },
                new Models.Seat() { Id = 9, SeatNumber = "B5", HallId = 1 },
                new Models.Seat() { Id = 10, SeatNumber = "C1", HallId = 1 },
                new Models.Seat() { Id = 11, SeatNumber = "C2", HallId = 1 },
                new Models.Seat() { Id = 12, SeatNumber = "C3", HallId = 1 },
                new Models.Seat() { Id = 13, SeatNumber = "C4", HallId = 1 },
                new Models.Seat() { Id = 14, SeatNumber = "C5", HallId = 1 },
                new Models.Seat() { Id = 16, SeatNumber = "A1", HallId = 2 },
                new Models.Seat() { Id = 17, SeatNumber = "A2", HallId = 2 },
                new Models.Seat() { Id = 18, SeatNumber = "A3", HallId = 2 },
                new Models.Seat() { Id = 19, SeatNumber = "A4", HallId = 2 },
                new Models.Seat() { Id = 20, SeatNumber = "A5", HallId = 2 },
                new Models.Seat() { Id = 21, SeatNumber = "B1", HallId = 2 },
                new Models.Seat() { Id = 22, SeatNumber = "B2", HallId = 2 },
                new Models.Seat() { Id = 23, SeatNumber = "B3", HallId = 2 },
                new Models.Seat() { Id = 24, SeatNumber = "B4", HallId = 2 },
                new Models.Seat() { Id = 25, SeatNumber = "B5", HallId = 2 },
                new Models.Seat() { Id = 26, SeatNumber = "C1", HallId = 2 },
                new Models.Seat() { Id = 27, SeatNumber = "C2", HallId = 2 },
                new Models.Seat() { Id = 28, SeatNumber = "C3", HallId = 2 },
                new Models.Seat() { Id = 29, SeatNumber = "C4", HallId = 2 },
                new Models.Seat() { Id = 30, SeatNumber = "C5", HallId = 2 },
                new Models.Seat() { Id = 31, SeatNumber = "A1", HallId = 3 },
                new Models.Seat() { Id = 32, SeatNumber = "A2", HallId = 3 },
                new Models.Seat() { Id = 33, SeatNumber = "A3", HallId = 3 },
                new Models.Seat() { Id = 34, SeatNumber = "A4", HallId = 3 },
                new Models.Seat() { Id = 35, SeatNumber = "A5", HallId = 3 },
                new Models.Seat() { Id = 36, SeatNumber = "B1", HallId = 3 },
                new Models.Seat() { Id = 37, SeatNumber = "B2", HallId = 3 },
                new Models.Seat() { Id = 38, SeatNumber = "B3", HallId = 3 },
                new Models.Seat() { Id = 39, SeatNumber = "B4", HallId = 3 },
                new Models.Seat() { Id = 40, SeatNumber = "B5", HallId = 3 },
                new Models.Seat() { Id = 41, SeatNumber = "C1", HallId = 3 },
                new Models.Seat() { Id = 42, SeatNumber = "C2", HallId = 3 },
                new Models.Seat() { Id = 43, SeatNumber = "C3", HallId = 3 },
                new Models.Seat() { Id = 44, SeatNumber = "C4", HallId = 3 },
                new Models.Seat() { Id = 45, SeatNumber = "C5", HallId = 3 }




                );
            context.Movies.AddOrUpdate(

               new Models.Movie() { Id = 1, Name = "Joker ", Director = "Todd Phillips", Actor = "Joaquin Phoenix", Genre = "Crime", Time = 122, Distributor = "cinestar", Country = "USA", DateRelase = 2019, Story = " In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker." },
               new Models.Movie() { Id = 2, Name = "Spektre", Director = "Sam Mendes", Actor = "Daniel Craig", Genre = "Action", Time = 142, Distributor = "cinestar", Country = "UK", DateRelase = 2015, Story = " A cryptic message from James Bond's past sends him on a trail to uncover the existence of a sinister organisation named SPECTRE. With a new threat dawning, Bond learns the terrible truth about the author of all his pain in his most recent missions." },
               new Models.Movie() { Id = 3, Name = "Spider-Man", Director = "Sam Raimi", Actor = "Stan Lee", Genre = "Action", Time = 120, Distributor = "cinestar", Country = "USA", DateRelase = 2002, Story = " When bitten by a genetically modified spider, a nerdy, shy, and awkward high school student gains spider-like abilities that he eventually must use to fight evil as a superhero after tragedy befalls his family." },
               new Models.Movie() { Id = 4, Name = "Alien", Director = "David Fincher", Actor = "Sigurney Weawer", Genre = "SF", Time = 137, Distributor = "cinestar", Country = "USA", DateRelase = 1992, Story = "After her last encounter, Ellen Ripley crash-lands on Fiorina 161, a maximum security prison. When a series of strange and deadly events occur shortly after her arrival, Ripley realizes that she has brought along an unwelcome visitor." },
               new Models.Movie() { Id = 5, Name = "Avatar", Director = "James Cameron", Actor = "Sam Worthington", Genre = "SF", Time = 162, Distributor = "cinestar", Country = "USA", DateRelase = 2009, Story = "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home." }


               );
            context.SaveChanges();
            context.Projections.AddOrUpdate(x => x.Id,
                new Models.Projection() { Id = 1, ProjectionTime = new DateTime(2021, 01, 17, 10, 30, 00), TicketPrice = 250.5, Administrator = "Boss", MovieId = 1, TypeId = 1, HallId = 1 },
                new Models.Projection() { Id = 2, ProjectionTime = new DateTime(2021, 01, 17, 14, 15, 00), TicketPrice = 650.5, Administrator = "Boss", MovieId = 2, TypeId = 2, HallId = 3 },
                new Models.Projection() { Id = 3, ProjectionTime = new DateTime(2021, 01, 18, 20, 30, 00), TicketPrice = 600.5, Administrator = "Boss", MovieId = 2, TypeId = 3, HallId = 2 },
                new Models.Projection() { Id = 4, ProjectionTime = new DateTime(2021, 01, 18, 18, 0, 0), TicketPrice = 149.9, Administrator = "Boss", MovieId = 3, TypeId = 2, HallId = 2 },
                new Models.Projection() { Id = 5, ProjectionTime = new DateTime(2021, 01, 01, 20, 18, 0, 0), TicketPrice = 850.9, Administrator = "Boss", MovieId = 4, TypeId = 1, HallId = 1 },
                new Models.Projection() { Id = 6, ProjectionTime = new DateTime(2021, 01, 01, 22, 15, 0, 0), TicketPrice = 525.5, Administrator = "Boss", MovieId = 5, TypeId = 1, HallId = 1 }



                );
            context.SaveChanges();

            context.Tickets.AddOrUpdate(x => x.Id,
                new Models.Ticket() { Id = 1, BuyingDate = new DateTime(2021, 01, 01, 10, 0, 0), UserId = 1, ProjectionId = 1, SeatId = 10 },
                new Models.Ticket() { Id = 2, BuyingDate = new DateTime(2021, 01, 01, 10, 0, 0), UserId = 1, ProjectionId = 2, SeatId = 32 },
                new Models.Ticket() { Id = 3, BuyingDate = new DateTime(2021, 01, 01, 10, 0, 0), UserId = 2, ProjectionId = 2, SeatId = 35 },
                new Models.Ticket() { Id = 4, BuyingDate = new DateTime(2021, 01, 01, 10, 0, 0), UserId = 2, ProjectionId = 4, SeatId = 20 },
                new Models.Ticket() { Id = 5, BuyingDate = new DateTime(2021, 01, 01, 10, 0, 0), UserId = 1, ProjectionId = 4, SeatId = 25 }
               );


            context.SaveChanges();







        }
    }
}
