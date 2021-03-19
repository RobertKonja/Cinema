using Cinema.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cinema.Interface
{
       public interface IUserRepository
    {

        IQueryable<User> GetAll();
        User GetById(int id);
        User GetByName(string name);
        void Create(User drzava);
        void Update(User drzava);
        void Delete(User drzava);


        
    }
}
