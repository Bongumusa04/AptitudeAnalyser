using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    [Table("Project")]
    public class Project
    {
        public int Id { get; set; }
        public string Url {get;set;}
        public bool Name { get; set; }
        public string PublicId   { get; set; }
        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
    }
}