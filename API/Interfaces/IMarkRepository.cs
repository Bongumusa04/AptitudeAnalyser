using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IMarkRepository
    {
        void Add(Marks mark);
        
        Task<Marks> GetMarkByUserAsync(string username);
    }
}