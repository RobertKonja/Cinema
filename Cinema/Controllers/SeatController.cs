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
    public class SeatController : ApiController
    {
        public ISeatRepository repo { get; set; }

        public SeatController(ISeatRepository repo)
        {
            this.repo = repo;
        }

        //Get api/seat
        public IQueryable<Seat> Get()
        {
            return repo.GetAll();

        }
        //Get api/seat/?hallId= && seatNumber=
        public IHttpActionResult GetByHallAndNumber(int hallId, string seatNumber)
        {

            Seat sd = repo.GetByHallAndNumber(hallId, seatNumber);

            if (sd == null)
            {
                return NotFound();
            }

            return Ok(sd);

        }

        //Get api/seat/?hallId= 
        public IQueryable<Seat> GetByHall(int hallId)

        {
            return repo.GetByHall(hallId);

        }










    }
}
