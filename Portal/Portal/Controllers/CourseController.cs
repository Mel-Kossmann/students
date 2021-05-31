using DevExtreme.AspNet.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Linq;
using System.Threading.Tasks;
using NLog;
using Portal;

namespace VWDMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        DataAccessLayer.DBc.SMSContext db = new DataAccessLayer.DBc.SMSContext();

        [HttpGet]
        public async Task<IActionResult> Get(DataSourceLoadOptions loadOptions)
        {
            var source = db.Courses
                .Select(p => new DataAccessLayer.DTO.Course
                {
                    Id = p.Id,
                    CourseCode = p.CourseCode,
                    CourseDesc = p.CourseDesc
                });

            return Ok(await DataSourceLoader.LoadAsync(source, loadOptions));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromForm] string values)
        {
            var Obj = new DataAccessLayer.DBc.Course();
            JsonConvert.PopulateObject(values, Obj);
            var checkEntry = db.Courses.Where(c => c.CourseCode == Obj.CourseCode).FirstOrDefault();
            if(checkEntry != null)
            {
                return BadRequest("Course already exists.");
            }
            db.Courses.Add(Obj);
            await db.SaveChangesAsync();

            return Ok(Obj.Id);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromForm] int key, [FromForm] string values)
        {
            var Obj = await db.Courses.FirstOrDefaultAsync(o => o.Id == key);

            if (Obj == null) return StatusCode(409, "not found");

            JsonConvert.PopulateObject(values, Obj);
            var checkEntry = db.Courses.Where(c => c.CourseCode == Obj.CourseCode && c.Id != Obj.Id).FirstOrDefault();
            if (checkEntry != null)
            {
                return BadRequest("Course already exists.");
            }

            await db.SaveChangesAsync();

            return Ok(Obj.Id);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromForm] int key)
        {
            try
            {
                var Obj = await db.Courses.FirstOrDefaultAsync(o => o.Id == key);
                if (Obj == null) return StatusCode(409, "not found");

                db.Courses.Remove(Obj);
                await db.SaveChangesAsync();

                return Ok("Course deleted");
            }
            catch (Exception e)
            {
                return BadRequest("Course not deleted.");
            }

        }
    }
}
