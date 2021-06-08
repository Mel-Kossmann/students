# SMS
Upload csv document to table and insert student data

# Requirements
Visual Studio
SQL Server
Browser

# NOTES
Front-End - Angular 8
Back-End - .Net Core 3.1

# Instructions
If you have not build a dotnet core application on your device before you can download the following SDK
.NET Core 3.1
Download it here: https://dotnet.microsoft.com/download

Download the hosting bundle if you would like to publish and host the site.

The database is a MSSQL db: execute the script in the DB folder

Open the solution in VS
In Solution Explorer navigate to appsettings.json 
Update the SMSConnection Server to your own server name. (dot = localhost)
Visual Studio will install all the missing packages required to run the application

When all the above is up and running, you can click on the run button.
Your browser should open automatically

When the project is running, you will be able to do the following:
Hidden about page
Navigation between pages
View all students with their courses and grades in one table
Add a csv document it will upload the data and will display it in the table on the home page
CRUD -  Add Students Page
CRUD -  Add Courses Page 
Detailed view, view students by studentNr

#UnitTesting
Basic unit testing for my controllers

Courses - Get, Post, Put, Delete = Passed
Student - Get, Post, Put, Delete = Passed
Grades - Get = Passed

Follow the instructions in the unit testing for further testing