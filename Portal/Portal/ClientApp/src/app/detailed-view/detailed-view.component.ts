import { Component, Inject } from '@angular/core';
import * as AspNetData from 'devextreme-aspnet-data-nojquery';

@Component({
  selector: 'app-detailed-view-component',
  templateUrl: './detailed-view.component.html'
})
export class DetailedViewComponent {

  constructor(@Inject('BASE_URL') baseUrl: string) {

  }
}
