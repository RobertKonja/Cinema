using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cinema.Models
{
    public class HallProjectionType
    {
        public int Id { get; set; }

        public Hall Hall { get; set; }
        public int HallId { get; set; }

        public ProjectionType ProjectionType { get; set; }
        public int ProjectionTypeId { get; set; }




    }
}