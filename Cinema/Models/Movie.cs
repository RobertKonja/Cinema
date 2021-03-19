using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Cinema.Models
{
    public class Movie
    {

        public int Id { get; set; }
        [Required]
        [StringLength(40)]
        public string Name { get; set; }
        public string Director { get; set; }
        public string Actor { get; set; }
        public string Genre { get; set; }
        [Range(0, int.MaxValue)]
        public int Time { get; set; }
        public string Distributor { get; set; }
        public string Country { get; set; }
        [Range(0, int.MaxValue)]
        public int DateRelase { get; set; }
        public string Story { get; set; }



    }
}