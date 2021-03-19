using Cinema.Interface;
using Cinema.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Cinema.Repository
{
    public class HallRepository : IHallRepository, IDisposable
    {
        public ApplicationDbContext db = new ApplicationDbContext();

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
        
        public IQueryable<Hall> GetAll()
        {
              return db.Halls;
     
        }

        public Hall GetById(int id)
        {
            return db.Halls.FirstOrDefault(x => x.Id == id);
        }

       

        public IQueryable<ProjectionType> GetProjectionTypeForHall(int hallId)
        {
            var list = db.HallProjectionTypes.Include(x => x.ProjectionType).Where(x => x.HallId == hallId).Select(x => x.ProjectionType);


            return list;
        }
    }
}