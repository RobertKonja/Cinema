using Cinema.Interface;
using Cinema.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;

namespace Cinema.Repository
{
    public class TicketRepository : ITicketRepository, IDisposable
    {
        public ApplicationDbContext db = new ApplicationDbContext();

        public void Create(Ticket ticket)
        {
            db.Tickets.Add(ticket);
            db.SaveChanges();
        }

        public void Delete(Ticket ticket)
        {
            db.Tickets.Remove(ticket);
            db.SaveChanges();

        }

        protected void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (db != null)
                {
                    db.Dispose();
                    db = null;
                }
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        
        public IQueryable<Ticket> GetAll()
        {
            return db.Tickets.Include(x => x.User).Include(x => x.Projection).Include(x => x.Seat);
        }

        public Ticket GetById(int id)
        {
            return db.Tickets.Include(x => x.User).Include(x => x.Projection).Include(x => x.Seat).FirstOrDefault(x => x.Id == id);
        }
    
        public IQueryable<Ticket> GetByProjection(int projectionId)
        {

            return db.Tickets.Include(x => x.User).Include(x => x.Projection.Movie).Include(x => x.Projection.Hall).Include(x => x.Seat).Where(x => x.Projection.Id == projectionId);

        }
        public IQueryable<Ticket> GetByUser(int userId)
        {
            return db.Tickets.Include(x => x.User).Include(x => x.Projection.Movie).Include(x => x.Projection.Hall).Include(x => x.Seat).Where(x => x.User.Id == userId );
        }
        public void Update(Ticket ticket)
        {
            db.Entry(ticket).State = EntityState.Modified;

            try
            {
                db.SaveChanges();

            }
            catch (DbUpdateConcurrencyException)
            {

                throw;
            }
        }
    }
}