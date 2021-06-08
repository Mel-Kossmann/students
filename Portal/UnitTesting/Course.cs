using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;
using Portal;
using System.Threading.Tasks;

namespace UnitTest
{
    [TestClass]
    public class Course
    {
        [TestMethod]
        public async Task CourseGet()
        {
            VWDMS.Controllers.CourseController course = new VWDMS.Controllers.CourseController();
            var result = await course.Get(new DataSourceLoadOptions());
            var okResult = result as OkObjectResult;            
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);

            //NOTE: GET Test Cases can be run without changing anything
        }

        [TestMethod]
        public async Task CoursePost()
        {
            VWDMS.Controllers.CourseController course = new VWDMS.Controllers.CourseController();
            DataAccessLayer.DTO.Course classValue = new DataAccessLayer.DTO.Course();
            classValue.CourseCode = "PR001";
            classValue.CourseDesc = "Programming 1";
            string json = JsonConvert.SerializeObject(classValue);
            var result = await course.Post(json);

            var okResult = result as OkObjectResult;

            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);

            //NOTE: The test will fail if you add a course name that already exist.
            //What to change: classValue.CourseCode and classValue.CourseDesc
            //Run the test
        }

        [TestMethod]
        public async Task CompanyPut()
        {
            VWDMS.Controllers.CourseController course = new VWDMS.Controllers.CourseController();
            DataAccessLayer.DTO.Course classValue = new DataAccessLayer.DTO.Course();
            classValue.CourseCode = "PR002";
            classValue.CourseDesc = "Programming 2";
            classValue.Id = 501;
            string json = JsonConvert.SerializeObject(classValue);
            //change first parameter in the put below
            var result = await course.Put(501, json);

            var okResult = result as OkObjectResult;

            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);

            //NOTE: The test will fail if you add a Course name and code that already exist.
            //What to change: classValue.CourseCode and classValue.CourseDesc
            //What to add: You will need the id of the row you are updating, change the following"
            //classValue.CourseCode, classValue.CourseDesc and first parameter in the put
            //company.Put(rowID,json)
            //Run the test
        }

        [TestMethod]
        public async Task CompanyDelete()
        {
            VWDMS.Controllers.CourseController course = new VWDMS.Controllers.CourseController();
            var result = await course.Delete(500);
            var okResult = result as OkObjectResult;

            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);

            //NOTE: The test will fail if you are trying to delete a course that is linked to an grade
            //Best course to delete: the one you added in the unit test post
            //What to change: You will need the id of the row you want to delete, change the first parameter in the delete
            //Run the test
        }
    }
}
