import { Component, Inject, OnInit } from '@angular/core';

import * as AspNetData from 'devextreme-aspnet-data-nojquery';
import { StudentService } from '../services/StudentService.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  dataSource: any;

  constructor(@Inject('BASE_URL') baseUrl: string, private studentService: StudentService) {
   this.dataSource = this.dataSource = AspNetData.createStore({      
      loadUrl: baseUrl + 'api/ViewStudent'
    });
  }

}
