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
    public class FileController : ControllerBase
    {
        DataAccessLayer.DBc.SMSContext db = new DataAccessLayer.DBc.SMSContext();

        [HttpGet]
        public async Task<IActionResult> Get(DataSourceLoadOptions loadOptions)
        {

            var source = db.Files
                .Select(p => new DataAccessLayer.DTO.File
                {
                    Id = p.Id,
                    UploadFile = p.UploadFile,
                    FileName = p.FileName
                });

            return Ok(await DataSourceLoader.LoadAsync(source, loadOptions));
        }
    }
}
