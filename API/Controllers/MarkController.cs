using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class MarkController: BaseApiController
    {
        
        private readonly DataContext _context;
        private readonly IMarkRepository _markRepository;

        public MarkController( DataContext context, IMarkRepository markRepository)
        {
            _context = context;
            _markRepository = markRepository;
        }
        
        [HttpPost]
        public  IActionResult Add(Marks marks)
        {
            var username = User.GetUsername();
            var mark = new Marks()
            {
                Username = username,
                MarkCS = marks.MarkCS
            };

            _markRepository.Add(mark);

            return BadRequest("Failed to add quiz mark.");

        }

        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MarksDto>>> GetMarksAsync()
        {
             var username = User.GetUsername();

            var mark = await _markRepository.GetMarkByUserAsync(username);

            return Ok(mark);
        }
    }
}