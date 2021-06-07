import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import * as AspNetData from 'devextreme-aspnet-data-nojquery';
import { StudentService } from '../services/StudentService.service';
@Component({
  selector: 'app-upload-file-component',
  templateUrl: './upload-file.component.html'
})

export class UploadFileComponent implements AfterViewInit {
  dataSource: any;
  CSVFilePath: any;
  csv: any;
  
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;

  constructor(@Inject('BASE_URL') baseUrl: string, private studentServce: StudentService) {
    this.dataSource = this.dataSource = AspNetData.createStore({
      loadUrl: baseUrl + 'api/File'
    });
    //this.csv = "heading1,heading2,heading3,heading4,heading5\nvalue1_1,value2_1,value3_1,value4_1,value5_1\nvalue1_2,value2_2,value3_2,value4_2,value5_2";
    this.csv = "Student Number; Firstname; Surname; Course Code; Course Description; Grade\n96041; Faheem; Takbot; CS101; Computer Science 1; A\n97041; Elleanor; Lozano; CS101; Computer Science 1; C\n98041; Ameer; Rees; CS201; Computer Science 2; D\n99041; Paula; Pike; CS201; Computer Science 2; E\n20041; Ritchie; Terrel; BS102; Business Science 1; A\n96041; Faheem; Takbot; IS101; Information Systems 1; A\n97041; Elleanor; Lozano; IS101; Information Systems 1; A\n98041; Ameer; Rees; BS102; Business Science 1; B\n99041; Paula; Pike; BS102; Business Science 1; B\n20041; Ritchie; Terrel; CS101; Computer Science 1; D";
    this.processData(this.csv);    
  }
 
  ngAfterViewInit() {
    interface HTMLInputEvent extends Event {
      target: HTMLInputElement & EventTarget;
    }

    document.getElementById("upload").onchange = function (e?: HTMLInputEvent) {
     let file: any = e.target.files[0];      

      const fileList = e.target.files[0];      
      const name = e.target.files[0].name;
      console.log("Name: " + name);
      console.log("Results: " + e.target.files);
      
      const reader = new FileReader();
      reader.readAsText(file);

      
      reader.onload = function () {
        //console.log("READER" + reader.result);
        var csv = reader.result.toString();

        var allTextLines = csv.split(/\r\n|\n/);
        var headers = allTextLines[0].split(';');        

        for (var i = 1; i < allTextLines.length; i++) {
          var data = allTextLines[i].split(';');
          if (data.length == headers.length) {            
            var taff = [];

            var studentNr;
            var firstname;
            var surname;
            var courseCode;
            var courseDesc;
            var grade;

            for (var j = 0; j < headers.length; j++) {              
              taff.push(data[j]);
              studentNr = taff[0];
              firstname = taff[1];
              surname = taff[2];
              courseCode = taff[3];
              courseDesc = taff[4];
              grade = taff[5];
            }
            //console.log(studentNr, firstname, surname, courseCode, courseDesc, grade);            
            this.studentServce.setStudents(studentNr, firstname, surname, courseCode, courseDesc, grade).subscribe(data => { });                 
          }
        }

      };

      reader.onerror = function () {
        console.log(reader.error);
      }
    }
  }

  processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split('; ');
    var lines = [];

    for (var i = 1; i < allTextLines.length; i++) {
      var data = allTextLines[i].split('; ');
      if (data.length == headers.length) {

        var tarr = [];
        var taff = [];

       var studentNr;
        var firstname;
        var surname;
        var courseCode;
        var courseDesc;
        var grade;

        for (var j = 0; j < headers.length; j++) {
          //tarr.push(headers[j] + ":" + data[j]);
          taff.push(data[j]);
          studentNr = taff[0];
          firstname = taff[1];
          surname = taff[2];
          courseCode = taff[3];
          courseDesc = taff[4];
          grade = taff[5];        
        }
        //console.log(studentNr, firstname, surname, courseCode, courseDesc, grade);
        lines.push(tarr);
        this.studentServce.setStudents(studentNr, firstname, surname, courseCode, courseDesc, grade).subscribe(data => { });
        //console.log(tarr);
        //console.log(taff);        
      }      
    }
    //this.studentServce.setStudents(123456,"Mel","Kossmann").subscribe(data => { });
    //alert(lines);
  }
}
