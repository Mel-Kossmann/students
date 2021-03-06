import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { DetailedViewComponent } from './detailed-view/detailed-view.component';
import { AddStudentsComponent } from './add-students/add-students.component';
import { AddCoursesComponent } from './add-courses/add-courses.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { DxAccordionModule, DxButtonModule, DxChartModule, DxCheckBoxModule, DxDataGridModule, DxDropDownBoxModule, DxFormModule, DxGalleryModule, DxPieChartModule, DxPopoverModule, DxPopupModule, DxScrollViewModule, DxSelectBoxModule, DxSliderModule, DxTabPanelModule, DxTabsModule, DxTagBoxModule, DxTemplateModule, DxTooltipModule, DxTreeViewModule, DxFileUploaderModule } from 'devextreme-angular';

import { StudentService } from './services/StudentService.service';
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    DetailedViewComponent,
    AddStudentsComponent,
    AddCoursesComponent,
    UploadFileComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    DxTabPanelModule,
    DxTreeViewModule,
    DxFileUploaderModule,
    DxTemplateModule,
    DxTooltipModule,
    DxPopupModule,
    DxDataGridModule,
    DxButtonModule,
    FormsModule,
    DxFormModule,
    DxPopoverModule,
    DxGalleryModule,
    DxTabsModule,
    DxSelectBoxModule,
    DxCheckBoxModule,
    DxScrollViewModule,
    DxChartModule,
    DxDropDownBoxModule,
    DxAccordionModule,
    DxSliderModule,
    DxTagBoxModule,
    DxPieChartModule,  
    RouterModule.forRoot([
      { path: '', component: HomeComponent},
      { path: 'detailed-view', component: DetailedViewComponent },
      { path: 'upload-file', component: UploadFileComponent },
      { path: 'add-students', component: AddStudentsComponent },
      { path: 'add-courses', component: AddCoursesComponent },
      { path: 'about-us', component: AboutUsComponent },
    ])
  ],
  providers: [StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
