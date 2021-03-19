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
    public class HallController : ApiController
    {
        public IHallRepository repo { get; set; }

        public HallController(IHallRepository repo)
        {
            this.repo = repo;
        }
        //Get api/hall
        public IQueryable<Hall> Get()
        {
            return repo.GetAll();

        }
        //Get api/hall/{id}
        public IHttpActionResult GetById(int id)
        {

            Hall hall = repo.GetById(id);
            if (hall == null)
            {
                return NotFound();
            }

            return Ok(hall);

        }
        //Get api/hall/?hallaId={}
        public IQueryable<ProjectionType> GetProjectionTypeForHall(int hallId)

        {


            return repo.GetProjectionTypeForHall(hallId);


        }







    }
}
