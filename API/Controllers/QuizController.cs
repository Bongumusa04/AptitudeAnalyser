using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Entities;

namespace API.Controllers
{
    public class QuizController : BaseApiController
    {
        private readonly DataContext _context;

        public QuizController( DataContext context)
        {
            _context = context;
        }

        // [HttpGet]
        // [Route("api/Questions")]
        // public Task<ActionResult<IEnumerable<Questions>>> GetQuestions() 
        // {
        //         var Qns = _context.Questions
        //             .Select(x => new { ID = x.ID, Qn = x.Question, x.Option1, x.Option2, x.Option3, x.Option4 })
        //             .Take(10)
        //             .ToArray();
        //         var updated = Qns.AsEnumerable()
        //             .Select(x => new
        //             {
        //                 QnID = x.ID,
        //                 Qn = x.Question,
        //                 Options = new string[] { x.Option1, x.Option2, x.Option3, x.Option4 }
        //             }).ToList();
        //          return Ok(updated); 
           
        // }

        // [HttpPost]
        // [Route("api/Answers")]
        // public Task<ActionResult<IEnumerable<Questions>>>  GetAnswers(int[] qIDs) 
        // {
        //        var result = _context.Questions
        //             .Where(y => qIDs.Contains(y.ID))
        //             .OrderBy(x => { return Array.IndexOf(qIDs, x.ID); })
        //             .Select(z => z.Answer)
        //             .ToArray()
        //              .AsEnumerable();
        //         return Ok(result); 
          
        // }
    }
}
