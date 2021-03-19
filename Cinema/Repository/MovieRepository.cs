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
    public class MovieRepository : IMovieRepository, IDisposable
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

        public void Create(Movie movie)
        {
            db.Movies.Add(movie);
            db.SaveChanges();
        }

        public void Delete(Movie movie)
        {
            db.Movies.Remove(movie);
            db.SaveChanges();
        }

        public IQueryable<Movie> GetAll()
        {
            return db.Movies;
        }

        public Movie GetById(int id)
        {
            return db.Movies.FirstOrDefault(x => x.Id == id);
        }

        public Movie GetByName(string name)
        {
            return db.Movies.FirstOrDefault(x => x.Name == name);
        }

        public void Update(Movie movie)
        {
            db.Entry(movie).State = EntityState.Modified;

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