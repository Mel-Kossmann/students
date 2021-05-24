import { Component, Inject } from '@angular/core';
import * as AspNetData from 'devextreme-aspnet-data-nojquery';

@Component({
  selector: 'app-upload-file-component',
  templateUrl: './upload-file.component.html'
})
export class UploadFileComponent {

  constructor(@Inject('BASE_URL') baseUrl: string) {

  }
}
