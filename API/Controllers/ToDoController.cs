using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Data;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Entities;

namespace API.Controllers
{
    public class ToDoController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IToDoRepository _toDoRepository;

        public ToDoController( DataContext context, IToDoRepository toDoRepository)
        {
            _context = context;
            _toDoRepository = toDoRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ToDoDto>>> GetToDoList([FromQuery] ToDoParams toDoParams)
        {
            var username = User.GetUsername();

            var toDos = await _toDoRepository.GetListByUserAsync(username, toDoParams);

            

            Response.AddPaginationHeader(toDos.CurrentPage, toDos.PageSize,
                toDos.TotalCount, toDos.TotalPages);

            return Ok(toDos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ToDoDto>> GetToDoList(int id)
        {
            var toDo = await _toDoRepository.GetListByIdAsync(id);

            return Ok(toDo);
        }

        [HttpPost]
        public  IActionResult Add(ToDo _toDo)
        {
            var username = User.GetUsername();
            var toDo = new ToDo()
            {
                Date = _toDo.Date,
                Name = _toDo.Name,
                Username = username,
                Description = _toDo.Description
            };

            _toDoRepository.Add(toDo);

            return BadRequest("Failed to add project to to-do list.");

        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, ToDoDto toDoDto)
        {
            var username = User.GetUsername();
            var toDo = await _toDoRepository.GetListByIdAsync(id);

            _toDoRepository.Update(toDo.Id);

            return BadRequest("Failed to update the to-do list.");

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var toDo = await _toDoRepository.GetListByIdAsync(id);

            _toDoRepository.Delete(toDo.Id);

            return BadRequest("Failed to delete the project from the list.");
        }
    }
}