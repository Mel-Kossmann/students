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
using DataAccessLayer.DTO;
using Microsoft.AspNetCore.Http;

namespace VWDMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        DataAccessLayer.DBc.SMSContext db = new DataAccessLayer.DBc.SMSContext();

        [HttpGet]
        public async Task<IActionResult> Get(DataSourceLoadOptions loadOptions)
        {
            var source = db.Students
                .Select(p => new DataAccessLayer.DTO.Student
                {
                    Id = p.Id,
                    StudentNr = p.StudentNr,
                    Name = p.Name,
                    Surname = p.Surname
                });

            return Ok(await DataSourceLoader.LoadAsync(source, loadOptions));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromForm] string values)
        {
            var Obj = new DataAccessLayer.DBc.Student();
            JsonConvert.PopulateObject(values, Obj);
            var checkEntry = db.Students.Where(c => c.StudentNr == Obj.StudentNr).FirstOrDefault();
            if(checkEntry != null)
            {
                return BadRequest("Student already exists.");
            }
            db.Students.Add(Obj);
            await db.SaveChangesAsync();

            return Ok(Obj.Id);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromForm] int key, [FromForm] string values)
        {
            var Obj = await db.Students.FirstOrDefaultAsync(o => o.Id == key);

            if (Obj == null) return StatusCode(409, "not found");

            JsonConvert.PopulateObject(values, Obj);
            var checkEntry = db.Students.Where(c => c.StudentNr == Obj.StudentNr && c.Id != Obj.Id).FirstOrDefault();
            if (checkEntry != null)
            {
                return BadRequest("Student already exists.");
            }

            await db.SaveChangesAsync();

            return Ok(Obj.Id);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromForm] int key)
        {
            try
            {
                var Obj = await db.Students.FirstOrDefaultAsync(o => o.Id == key);
                if (Obj == null) return StatusCode(409, "not found");

                db.Students.Remove(Obj);
                await db.SaveChangesAsync();

                return Ok("Student deleted");
            }
            catch (Exception e)
            {
                return BadRequest("Student not deleted.");
            }

        }

        [HttpPost("upload")]
        public ActionResult upload(int studentNr, string firstname, string surname, string courseCode, string courseDesc, string grade)
        {
            try
            {                
                var course = db.Courses.Where(c => c.CourseCode == courseCode && c.CourseDesc == courseDesc).FirstOrDefault();
                if(course == null)
                {
                    course = new DataAccessLayer.DBc.Course
                    {
                        CourseCode = courseCode,
                        CourseDesc = courseDesc
                    };
                }

                var student = db.Students.Where(c => c.StudentNr == studentNr && c.Name == firstname && c.Surname == surname).FirstOrDefault();
                if (student == null)
                {
                    student = new DataAccessLayer.DBc.Student
                    {
                        StudentNr = studentNr,
                        Name = firstname,
                        Surname = surname
                    };
                }

                var gradeObj = new DataAccessLayer.DBc.Grade
                {
                    Grade1 = grade,
                    Course = course,
                    Student = student
                };

                db.Grades.Add(gradeObj);
                db.SaveChanges();        
                return Ok();
            }
            catch (Exception e)
            {                
                return StatusCode(StatusCodes.Status500InternalServerError, e.ToString());
            }
        }
    }
}
