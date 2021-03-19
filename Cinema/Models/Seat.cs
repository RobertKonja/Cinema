using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cinema.Models
{
    public class Seat
    {

        public int Id { get; set; }


        public string SeatNumber { get; set; }

        public Hall Hall { get; set; }


        public int HallId { get; set; }



    }
}