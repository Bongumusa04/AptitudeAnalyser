using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class MarkRepository: IMarkRepository
    {
        private readonly DataContext _context;
        public MarkRepository(DataContext context)
        {
            _context = context;
            
        }
        public void Add(Marks mark)
        {
            if(mark != null)
            {
                _context.Marks.Add(mark);
                 _context.SaveChanges();
            }
        }
        
        public async Task<Marks> GetMarkByUserAsync(string username)
        {
             return await _context.Marks
                        .Where(e => e.Username == username)
                        .FirstOrDefaultAsync();          
        }

    }
}