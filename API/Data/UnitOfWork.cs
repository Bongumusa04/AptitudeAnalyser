using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;

namespace API.Data
{
    public class UnitOfWork : IUnitOfWork
    {
         private readonly DataContext _context;
        public UnitOfWork(DataContext context)
        {
            _context = context;

        }

        public IToDoRepository ToDoRepository => new ToDoRepository(_context);

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public bool HasChanges()
        {
            return _context.ChangeTracker.HasChanges();
        }
    }
}