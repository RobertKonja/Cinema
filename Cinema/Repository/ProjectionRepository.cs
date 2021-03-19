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
    public class ProjectionRepository : IProjectionRepository, IDisposable
    {
        public ApplicationDbContext db = new ApplicationDbContext();
 
        public void Create(Projection projection)
        {
            db.Projections.Add(projection);
            db.SaveChanges();
        }

        public void Delete(Projection projection)
        {
            db.Projections.Remove(projection);
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

        public IQueryable<Projection> GetAll()
        {
            return db.Projections.Include(x => x.Movie).Include(x => x.Hall).Include(x => x.Type);
        }

        public Projection GetById(int id)
        {
            return db.Projections.Include(x => x.Movie).Include(x => x.Hall).Include(x => x.Type).FirstOrDefault(x => x.Id == id);
        }
        // POST 
        public IQueryable<Projection> Searching(Search p)
        {
            IQueryable<Projection> list= GetAll();
            if (p.MovieName != null)
            {
                list = list.Where(x => x.Movie.Name == p.MovieName);
            }
            if (p.Hall != null)
            {
                list = list.Where(x => x.Hall.Name == p.Hall);
            }
            if (p.DateFrom != null || p.DateTo != null)
            {
                list = list.Where(x => x.ProjectionTime > p.DateFrom && x.ProjectionTime < p.DateTo);
            }
            if (p.HallType != null)
            {
                list = list.Where(x => x.Type.Name == p.HallType);
            }
            if (p.PriceFrom > 0 && p.PriceTo > 0)
            {
                list = list.Where(x => x.TicketPrice > p.PriceFrom && x.TicketPrice < p.PriceTo);
            }



            return list;

        }

        public void Update(Projection projection)
        {
            db.Entry(projection).State = EntityState.Modified;



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