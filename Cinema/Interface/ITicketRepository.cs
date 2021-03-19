using Cinema.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cinema.Interface
{
      public interface ITicketRepository
    {

        IQueryable<Ticket> GetAll();
        Ticket GetById(int id);
        IQueryable<Ticket> GetByProjection(int projectionId);
        IQueryable<Ticket> GetByUser(int userId);

        void Create(Ticket ticket);
        void Update(Ticket ticket);
        void Delete(Ticket ticket);

    }

}
