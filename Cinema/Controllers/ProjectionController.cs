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
    public class ProjectionController : ApiController
    {
        public IProjectionRepository repo { get; set; }

        public ProjectionController(IProjectionRepository repo)
        {
            this.repo = repo;
        }



        //Get api/projection
        public IQueryable<Projection> Get()
        {

            return repo.GetAll();


        }
        // Get api/projektion/id
        public IHttpActionResult GetById(int id)
        {
            var proj = repo.GetById(id);
            if (proj == null)
            {
                return NotFound();
            }
            return Ok(proj);

        }

        // Post api/projection 
        public IHttpActionResult Post(Projection p)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);

            }


            repo.Create(p);
            return CreatedAtRoute("DefaultApi", new { id = p.Id }, p);



        }
        // Put  api/projection/id
        public IHttpActionResult Put(int id, Projection projection)
        {
           
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != projection.Id)
            {
                return BadRequest();


            }


            try
            {
                repo.Update(projection);
            }
            catch (Exception)
            {

                return BadRequest();
            }

            return Ok(projection);

        }
        // Delete api/projection/{id}

        public IHttpActionResult Delete(int id)
        {
            var proj = repo.GetById(id);
            if (proj == null)
            {
                return NotFound();
            }

            repo.Delete(proj);
            return Ok();


        }
        //Post api/projection/searching
        [Route("api/projection/Searching")]
        public IQueryable<Projection>  PostSearching(Search p)
        {

            return  repo.Searching(p);

        }

    }
}
