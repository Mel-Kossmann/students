using System;
using System.Collections.Generic;

#nullable disable

namespace DataAccessLayer.DBc
{
    public partial class File
    {
        public int Id { get; set; }
        public string UploadFile { get; set; }
        public string FileName { get; set; }
    }
}
