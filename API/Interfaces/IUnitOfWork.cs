using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUnitOfWork
    {
         IToDoRepository ToDoRepository {get;}
         Task<bool> Complete();
         bool HasChanges();
    }
}