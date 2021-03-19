using Cinema.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cinema.Interface
{
       public   interface ISeatRepository
    {
        IQueryable<Seat> GetAll();

        IQueryable<Seat> GetByHall(int hallId);
        Seat GetByHallAndNumber(int hallId, string seatNumber);



    }
}
