using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Project,ProjectDto>();
            CreateMap<MemberUpdateDto,AppUser>();
            CreateMap<RegisterDto,AppUser>(); 
            CreateMap<ToDoDto, ToDo>();
            CreateMap<MarksDto, Marks>();

        }
    }
}