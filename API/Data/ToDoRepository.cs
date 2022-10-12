using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ToDoRepository : IToDoRepository
    {
        private readonly DataContext _context;
        public ToDoRepository(DataContext context)
        {
            _context = context;
            
        }
        public void Add(ToDo toDo)
        {
            if(toDo != null)
            {
                _context.ToDos.Add(toDo);
                 _context.SaveChanges();
            }
        }

        public void Delete(int id)
        {
            var toDo = _context.ToDos.FirstOrDefault(e => e.Id == id);
            if (toDo != null)
            {
                _context.ToDos.Remove(toDo);
                 _context.SaveChanges();
            }
        }

        public async Task<ToDo> GetListByIdAsync(int id)
        {
            return await _context.ToDos.FindAsync(id);
        }

        public async Task<PagedList<ToDo>> GetListByUserAsync(string username, ToDoParams toDoParams)
        {
             var query = _context.ToDos.Where(e => e.Username == username).AsNoTracking();

            var minDate = DateTime.Today.AddMonths(-1);
            if (toDoParams.Filter)
            {
                query = query.Where(e => DateTime.Compare(e.Date, minDate) > 0);
            }
            return await PagedList<ToDo>.CreateAsync(query, toDoParams.PageNumber, toDoParams.PageSize);
       
        }

        public void Update(int id)
        {
            var todo = _context.ToDos.FirstOrDefault(e => e.Id == id);
            if (todo != null)
            {
                _context.Entry(todo).State = EntityState.Modified;
                _context.SaveChanges();
                
            }
        }
    }
}