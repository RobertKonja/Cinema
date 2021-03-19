using Cinema.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cinema.Interface
{
      public interface IMovieRepository
    {
        IQueryable<Movie> GetAll();
        Movie GetById(int id);
        Movie GetByName(string name);
        void Create(Movie movie);
        void Update(Movie movie);
        void Delete(Movie movie);








    }
}
