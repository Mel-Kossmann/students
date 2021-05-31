using System;
using System.Collections.Generic;

#nullable disable

namespace DataAccessLayer.DBc
{
    public partial class Student
    {
        public Student()
        {
            Grades = new HashSet<Grade>();
        }

        public int Id { get; set; }
        public int StudentNr { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }

        public virtual ICollection<Grade> Grades { get; set; }
    }
}
