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
    public class UserRepository : IUserRepository, IDisposable
    {
        public ApplicationDbContext db = new ApplicationDbContext();

        public void Create(User user)
        {
            db.Users.Add(user);
            db.SaveChanges();
        }

        public void Delete(User user)
        {
            db.Users.Remove(user);
            db.SaveChanges();
        }

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
        public IQueryable<User> GetAll()
        {
            return db.Users;
        }

        public User GetById(int id)
        {
            return db.Users.FirstOrDefault(x => x.Id == id);
        }

        public User GetByName(string name)
        {
            return db.Users.FirstOrDefault(x => x.UserName == name);
        }

        public void Update(User user)
        {
            db.Entry(user).State = EntityState.Modified;


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