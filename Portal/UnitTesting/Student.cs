using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;
using Portal;
using System.Threading.Tasks;

namespace UnitTest
{
    [TestClass]
    public class Student
    {
        [TestMethod]
        public async Task StudentGet()
        {
            VWDMS.Controllers.StudentController student = new VWDMS.Controllers.StudentController();
            var result = await student.Get(new DataSourceLoadOptions());
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);

            //NOTE: GET Test Cases can be run without changing anything
        }

        [TestMethod]
        public async Task StudentPost()
        {
            VWDMS.Controllers.StudentController student = new VWDMS.Controllers.StudentController();
            DataAccessLayer.DTO.Student classValue = new DataAccessLayer.DTO.Student();
            classValue.StudentNr = 19950412;
            classValue.Name = "Melody";
            classValue.Surname = "Kossmann";            
            string json = JsonConvert.SerializeObject(classValue);
            var result = await student.Post(json);

            var okResult = result as OkObjectResult;

            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);

            //NOTE: The test will fail if you add a studentnr and name that already exist.
            //What to change: classValue.StudentNr,classValue.Name and classValue.Surname
            //Run the test
        }

        [TestMethod]
        public async Task StudentPut()
        {
            VWDMS.Controllers.StudentController student = new VWDMS.Controllers.StudentController();
            DataAccessLayer.DTO.Student classValue = new DataAccessLayer.DTO.Student();
            classValue.StudentNr = 19950412;
            classValue.Name = "Mel";
            classValue.Surname = "Craddock";
            classValue.Id = 662;
            string json = JsonConvert.SerializeObject(classValue);
            //change first parameter in the put below
            var result = await student.Put(662, json);

            var okResult = result as OkObjectResult;

            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);

            //NOTE: The test will fail if you add a studentnr and name that already exist.
            //What to change: classValue.StudentNr,classValue.Name and classValue.Surname
            //What to add: You will need the id of the row you are updating, change the following"
            //cclassValue.StudentNr,classValue.Name and classValue.Surname and first parameter in the put
            //company.Put(rowID,json)
            //Run the test
        }

        [TestMethod]
        public async Task StudentDelete()
        {
            VWDMS.Controllers.StudentController student = new VWDMS.Controllers.StudentController();
            var result = await student.Delete(661);
            var okResult = result as OkObjectResult;

            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);

            //NOTE: The test will fail if you are trying to delete a student that is linked to an grade
            //Best student to delete: the one you added in the unit test post
            //What to change: You will need the id of the row you want to delete, change the first parameter in the delete
            //Run the test
        }
    }
}
