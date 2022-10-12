using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IToDoRepository
    {
        void Update(int id);
        void Delete(int id);

        void Add(ToDo toDo);
        
        Task<PagedList<ToDo>> GetListByUserAsync(string username, ToDoParams toDoParams);
        Task<ToDo> GetListByIdAsync(int id);
    }
}