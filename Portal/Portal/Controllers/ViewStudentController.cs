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
    public class ViewStudentController : ControllerBase
    {
        DataAccessLayer.DBc.SMSContext db = new DataAccessLayer.DBc.SMSContext();

        [HttpGet]
        public async Task<IActionResult> Get(DataSourceLoadOptions loadOptions)
        {
            /*var source = from g in db.Grades
                       join s in db.Students on g.StudentId equals s.Id
                       join c in db.Courses on g.CourseId equals c.Id
                       select new { StudentNr = g.Student.StudentNr, Name = g.Student.Name, Surname = g.Student.Surname, CourseCode = g.Course.CourseCode, CourseDesc = g.Course.CourseDesc, Grade = g.Grade1 };*/

            var source = db.Grades.Select(g => new DataAccessLayer.DTO.ViewStudents
            {
                StudentNr = g.Student.StudentNr,
                Name = g.Student.Name,
                Surname = g.Student.Surname,
                CourseCode = g.Course.CourseCode,
                CourseDesc = g.Course.CourseDesc,
                Grade = g.Grade1
            });

            return Ok(await DataSourceLoader.LoadAsync(source, loadOptions));
        }
    }
}
