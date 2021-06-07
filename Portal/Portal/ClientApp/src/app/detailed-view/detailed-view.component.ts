import { Component, Inject } from '@angular/core';
import * as AspNetData from 'devextreme-aspnet-data-nojquery';

@Component({
  selector: 'app-detailed-view-component',
  templateUrl: './detailed-view.component.html'
})
export class DetailedViewComponent {
  dataSource: any;
  constructor(@Inject('BASE_URL') baseUrl: string) {
    this.dataSource = this.dataSource = AspNetData.createStore({      
      loadUrl: baseUrl + 'api/ViewStudent'
    });
  }
}
