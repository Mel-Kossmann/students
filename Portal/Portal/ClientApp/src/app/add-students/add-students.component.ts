import { Component, Inject } from '@angular/core';
import * as AspNetData from 'devextreme-aspnet-data-nojquery';

@Component({
  selector: 'app-add-students-component',
  templateUrl: './add-students.component.html'
})
export class AddStudentsComponent {
  dataSource: any;
  constructor(@Inject('BASE_URL') baseUrl: string) {
    this.dataSource = this.dataSource = AspNetData.createStore({
      key: 'id',
      loadUrl: baseUrl + 'api/Student',
      updateUrl: baseUrl + 'api/Student',
      insertUrl: baseUrl + 'api/Student',
      deleteUrl: baseUrl + 'api/Student'
    });
  }
}
