using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Cinema.Models
{
    public class Projection
    {


        public int Id { get; set; }
        [Required]
        public DateTime ProjectionTime { get; set; }
        [Required]
        [Range(0, double.MaxValue)]
        public double TicketPrice { get; set; }

        public string Administrator { get; set; }
        public Movie Movie { get; set; }
        public int MovieId { get; set; }


        public ProjectionType  Type { get; set; }
        public int TypeId { get; set; }
        public Hall Hall { get; set; }
        public int HallId { get; set; }




















    }
}