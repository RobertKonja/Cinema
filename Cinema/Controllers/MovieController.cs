using Cinema.Interface;
using Cinema.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Cinema.Controllers
{
    public class MovieController : ApiController
    {
        public IMovieRepository repo { get; set; }

        public MovieController(IMovieRepository repo)
        {
            this.repo = repo;
        }

        public IQueryable<Movie> Get()
        {

            return repo.GetAll();


        }
        // Get api/movie/id
        public IHttpActionResult GetById(int id)
        {
            var movie = repo.GetById(id);
            if (movie == null)
            {
                return NotFound();
            }
            return Ok(movie);

        }


        // Get api/movie/?name = {}
        public IHttpActionResult GetByName(string name)
        {

            var movie = repo.GetByName(name);
            if (movie == null)
            {
                return NotFound();
            }
            return Ok(movie);



        }

        // Post api/movie 
        public IHttpActionResult Post(Movie f)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);

            }


            repo.Create(f);
            return CreatedAtRoute("DefaultApi", new { id = f.Id }, f);



        }
        // Put  api/movie/id
        public IHttpActionResult Put(int id, Movie f)
        {
            
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (id != f.Id)
            {
                return BadRequest();

            }

            try
            {
                repo.Update(f);
            }
            catch (Exception)
            {

                return BadRequest();
            }
            return Ok(f);

        }
        // Delete api/Movie/{id}

        public IHttpActionResult Delete(int id)
        {
            var movie = repo.GetById(id);
            if (movie == null)
            {
                return NotFound();
            }

            repo.Delete(movie);
            return Ok();


        }





    }
}
