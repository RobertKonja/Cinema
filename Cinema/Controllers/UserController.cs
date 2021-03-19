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
    public class UserController : ApiController
    {
        public IUserRepository repo { get; set; }

        public UserController(IUserRepository repo)
        {
            this.repo = repo;
        }

       // [Authorize]
        // Get api/user
        public IQueryable<User> Get()
        {

            return repo.GetAll();


        }
       // [Authorize]
        // Get api/user/{id}
        public IHttpActionResult GetById(int id)
        {
            var user = repo.GetById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);

        }
        // Get api/user/?name={}

        public IHttpActionResult GetByName(string name)
        {
            var user = repo.GetByName(name);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);

        }
        // Post api/user 
        public IHttpActionResult Post(User k)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);

            }


            repo.Create(k);
            return CreatedAtRoute("DefaultApi", new { id = k.Id }, k);



        }
        // Put  api/user/{id}
        public IHttpActionResult Put(int id, User k)
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
        // Delete api/user/{id}

        public IHttpActionResult Delete(int id)
        {
            var user = repo.GetById(id);
            if (user == null)
            {
                return NotFound();
            }

            repo.Delete(user);
            return Ok();


        }










    }
}
