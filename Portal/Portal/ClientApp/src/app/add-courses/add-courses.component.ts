import { Component, Inject } from '@angular/core';
import * as AspNetData from 'devextreme-aspnet-data-nojquery';

@Component({
  selector: 'app-add-courses-component',
  templateUrl: './add-courses.component.html'
})
export class AddCoursesComponent {
  dataSource: any;
  constructor(@Inject('BASE_URL') baseUrl: string) {
    this.dataSource = this.dataSource = AspNetData.createStore({
      key: 'id',
      loadUrl: baseUrl + 'api/Course',
      updateUrl: baseUrl + 'api/Course',
      insertUrl: baseUrl + 'api/Course',
      deleteUrl: baseUrl + 'api/Course'
    });
  }
}
