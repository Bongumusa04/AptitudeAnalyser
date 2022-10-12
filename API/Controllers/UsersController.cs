using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public IProjectService _projectService { get; }

        public UsersController(IUserRepository userRepository, IMapper mapper, IProjectService projectService)
        {
            _projectService = projectService;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        // api/users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await _userRepository.GetMembersAsync();

            return Ok(users);
        }

        // api/users/3
        [HttpGet("{username}", Name ="GetUser")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            return await _userRepository.GetMemberAsync(username);
        }

        // api/users
        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
        {
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

            _mapper.Map(memberUpdateDto, user);

            _userRepository.Update(user);

            if (await _userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update user");
        }

        [HttpPost("add-project")]
        public async Task<ActionResult<ProjectDto>> AddProject(IFormFile file)
        {
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

            var result = await _projectService.AddProjectAsync(file);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var project = new Project
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            

            user.Projects.Add(project);

            if (await _userRepository.SaveAllAsync())
            {
                //return _mapper.Map<PhotoDto>(photo);
                return CreatedAtRoute("GetUser",new {username = user.UserName},_mapper.Map<ProjectDto>(project));
            }


            return BadRequest("Problem adding project");
        }

        [HttpDelete("delete-project/{projectId}")]
        public async Task<ActionResult> DeletePhoto(int photoId)
        {
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

            var photo = user.Projects.FirstOrDefault(x => x.Id == photoId);

            if (photo == null) return NotFound();

            

            if (photo.PublicId != null)
            {
                var result = await _projectService.DeleteProjectAsync(photo.PublicId);
                if (result.Error != null) return BadRequest(result.Error.Message);
            }

            user.Projects.Remove(photo);

            if (await _userRepository.SaveAllAsync()) return Ok();

            return BadRequest("Failed to delete the project");
        }

    }
}