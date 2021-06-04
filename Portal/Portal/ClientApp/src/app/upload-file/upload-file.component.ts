import { Component, Inject, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import * as AspNetData from 'devextreme-aspnet-data-nojquery';

@Component({
  selector: 'app-upload-file-component',
  templateUrl: './upload-file.component.html'
})

export class UploadFileComponent {
  dataSource: any;
  CSVFilePath: any;
  csv: any;
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;

  constructor(@Inject('BASE_URL') baseUrl: string) {
    this.dataSource = this.dataSource = AspNetData.createStore({
      loadUrl: baseUrl + 'api/File'
    });
    //this.csv = "heading1,heading2,heading3,heading4,heading5\nvalue1_1,value2_1,value3_1,value4_1,value5_1\nvalue1_2,value2_2,value3_2,value4_2,value5_2";
    this.csv = "Student Number; Firstname; Surname; Course Code; Course Description; Grade\n96041; Faheem; Takbot; CS101; Computer Science 1; A\n97041; Elleanor; Lozano; CS101; Computer Science 1; C\n98041; Ameer; Rees; CS201; Computer Science 2; D\n99041; Paula; Pike; CS201; Computer Science 2; E\n20041; Ritchie; Terrel; BS102; Business Science 1; A\n96041; Faheem; Takbot; IS101; Information Systems 1; A\n97041; Elleanor; Lozano; IS101; Information Systems 1; A\n98041; Ameer; Rees; BS102; Business Science 1; B\n99041; Paula; Pike; BS102; Business Science 1; B\n20041; Ritchie; Terrel; CS101; Computer Science 1; D";
    this.processData(this.csv);
  }

  onUploaded(e, cellInfo) {
    var AddImg = e.request.responseText;
    this.dataGrid.instance.cellValue(cellInfo.rowIndex, "labelName", AddImg);   
  }

  processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split('; ');
    var lines = [];

    for (var i = 1; i < allTextLines.length; i++) {
      var data = allTextLines[i].split('; ');
      if (data.length == headers.length) {

        var tarr = [];
        for (var j = 0; j < headers.length; j++) {
          tarr.push(headers[j] + ":" + data[j]);
        }
        lines.push(tarr);
        console.log(tarr);
      }
    }
    //alert(lines);
  }

  SaveDone(e) {
    alert("saving");
  }
}
