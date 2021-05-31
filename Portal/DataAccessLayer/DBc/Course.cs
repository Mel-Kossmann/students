using System;
using System.Collections.Generic;

#nullable disable

namespace DataAccessLayer.DBc
{
    public partial class Course
    {
        public Course()
        {
            Grades = new HashSet<Grade>();
        }

        public int Id { get; set; }
        public string CourseCode { get; set; }
        public string CourseDesc { get; set; }

        public virtual ICollection<Grade> Grades { get; set; }
    }
}
