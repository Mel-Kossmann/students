using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;
using Portal;
using System.Threading.Tasks;

namespace UnitTest
{
    [TestClass]
    public class Grades
    {
        [TestMethod]
        public async Task GradesGet()
        {
            VWDMS.Controllers.ViewStudentController grades = new VWDMS.Controllers.ViewStudentController();
            var result = await grades.Get(new DataSourceLoadOptions());
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);

            //NOTE: GET Test Cases can be run without changing anything
        }        
    }
}
