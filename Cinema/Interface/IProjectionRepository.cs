using Cinema.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cinema.Interface
{
       public interface IProjectionRepository
    {
        IQueryable<Projection> GetAll();
        Projection GetById(int id);
        void Create(Projection projection);
        void Update(Projection projection);
        void Delete(Projection projection);

        IQueryable<Projection> Searching(Search p);


       




    }
}
