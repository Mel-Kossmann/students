import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(@Inject('BASE_URL') baseUrl: string, private studentService: StudentService, private router: Router, private route: ActivatedRoute) {
    this.dataSource = this.dataSource = AspNetData.createStore({
      loadUrl: baseUrl + 'api/File'
    });
   
  }


  ngAfterViewInit() {    
    interface HTMLInputEvent extends Event {
      target: HTMLInputElement & EventTarget;
    }
    
    document.getElementById("upload").onchange = (e?: HTMLInputEvent) => {
     let file: any = e.target.files[0];      
    
      const name = e.target.files[0].name;
      const date = e.target.files[0].lastModified;
      console.log("Name: " + name);
      console.log("Date: " + date);
      
      const reader = new FileReader();
      reader.readAsText(file);

      
      reader.onload = () => {        
        var csv = reader.result.toString();

        var allTextLines = csv.split(/\r\n|\n/);
        var headers = allTextLines[0].split(';');        

        for (var i = 1; i < allTextLines.length; i++) {
          var data = allTextLines[i].split(';');
          if (data.length == headers.length) {            
            var taff = [];

            var studentNr, firstname, surname, courseCode,courseDesc,grade;

            for (var j = 0; j < headers.length; j++) {              
              taff.push(data[j]);
              studentNr = taff[0];
              firstname = taff[1];
              surname = taff[2];
              courseCode = taff[3];
              courseDesc = taff[4];
              grade = taff[5];
            }               
            this.studentService.setStudents(studentNr, firstname, surname, courseCode, courseDesc, grade).subscribe(data => { });                 
          }
        }
      };
      this.router.navigate([`/`], {relativeTo: this.route });
      reader.onerror = function () {
        console.log(reader.error);
      }
    }
  }
}
