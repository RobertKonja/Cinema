using Cinema.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cinema.Interface
{
     public  interface IHallRepository
    {
        IQueryable<Hall> GetAll();

        Hall GetById(int id);
        IQueryable<ProjectionType> GetProjectionTypeForHall(int id);





    }
}
