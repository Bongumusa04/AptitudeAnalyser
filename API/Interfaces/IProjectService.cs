using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;

namespace API.Interfaces
{
    public interface IProjectService
    {
        Task<ImageUploadResult> AddProjectAsync(IFormFile file);
        Task<DeletionResult> DeleteProjectAsync(string publicId);
    }
}