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

  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;

  constructor(@Inject('BASE_URL') baseUrl: string) {
    this.dataSource = this.dataSource = AspNetData.createStore({
      loadUrl: baseUrl + 'api/File'
    });
  }

  upload(e, cellInfo) {
    var AddImg = e.request.responseText;
    this.dataGrid.instance.cellValue(cellInfo.rowIndex, "labelName", AddImg);
    /*const csv = require('csv-parser');
    const fs = require('fs');

    fs.createReadStream('data.csv')
      .pipe(csv())
      .on('data', (row) => {
        console.log(row);
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
      });*/
  }

  SaveDone(e) {
    alert("saving");
  }
}
