using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cinema.Models
{
    public class Ticket
    {


        public int Id { get; set; }
        public DateTime BuyingDate { get; set; }


        public User User { get; set; }
        public int UserId { get; set; }


        public Projection Projection { get; set; }
       
        public int ProjectionId { get; set; }

        public Seat Seat { get; set; }
        public int SeatId { get; set; }



    }
}