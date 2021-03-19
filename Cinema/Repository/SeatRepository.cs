using Cinema.Interface;
using Cinema.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Cinema.Repository
{
    public class SeatRepository : ISeatRepository, IDisposable
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
       
        public IQueryable<Seat> GetAll()
        {
    
            return db.Seats.Include(x => x.Hall);
        }

        public IQueryable<Seat> GetByHall(int hallId)
        {
            IQueryable<Seat> lista = db.Seats.Where(x => x.HallId == hallId);
            return lista;
        }

            public Seat GetByHallAndNumber(int hallId, string seatNumber)
        {
                  Seat sd = db.Seats.FirstOrDefault(x => x.HallId == hallId && x.SeatNumber == seatNumber);
                      return sd;
             }
    }
}