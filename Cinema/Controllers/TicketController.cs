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
    public class TicketController : ApiController
    {
        public ITicketRepository repo { get; set; }

        public TicketController(ITicketRepository repo)
        {
            this.repo = repo;
        }

        // Get api/ticket

        public IQueryable<Ticket> Get()
        {

            return repo.GetAll();


        }
        // Get api/ticket/{id}
        public IHttpActionResult GetById(int id)
        {
            var ticket = repo.GetById(id);
            if (ticket == null)
            {
                return NotFound();
            }
            return Ok(ticket);

        }
        //Get api/ticket/?projectionId={}



        public IQueryable<Ticket> GetByProjection(int projectionId)
        {

            return repo.GetByProjection(projectionId);



        }



        //Get  api/ticket/?userId={}
        public IQueryable<Ticket> GetByUser(int userId)
        {

            return repo.GetByUser(userId);



        }

        // Post api/ticket
        public IHttpActionResult Post(Ticket k)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);

            }


            repo.Create(k);
            return CreatedAtRoute("DefaultApi", new { id = k.Id }, k);



        }
        // Put  api/ticket/{id}
        public IHttpActionResult Put(int id, Ticket k)
        {
           
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != k.Id)
            {
                return BadRequest();


            }

            try
            {
                repo.Update(k);
            }
            catch (Exception)
            {

                return BadRequest();
            }

            return Ok(k);

        }
        // Delete api/ticket/{id}

        public IHttpActionResult Delete(int id)
        {
            var k = repo.GetById(id);
            if (k == null)
            {
                return NotFound();
            }

            repo.Delete(k);
            return Ok();


        }



    }
}
