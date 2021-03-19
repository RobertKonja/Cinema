using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cinema.Models
{
    public class Search
    {

        public string MovieName { get; set; }
        public string Hall { get; set; }
        public DateTime? DateFrom { get; set; }

        public DateTime? DateTo { get; set; }
        public string HallType { get; set; }
        public double? PriceFrom { get; set; }
        public double? PriceTo { get; set; }




    }
}