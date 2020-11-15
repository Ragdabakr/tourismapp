import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FileUploadModule } from 'ng2-file-upload';
import { QuillModule } from 'ngx-quill';
import { TagInputModule } from 'ngx-chips';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpModule } from '@angular/http';
import { ArchwizardModule } from 'angular-archwizard';

import { ToursRoutingModule } from './tours-routing.module';
import { CreateTourComponent } from './create-tour/create-tour.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../shared/shared.module';
import { TourListComponent } from './tour-list/tour-list.component';

@NgModule({
  declarations: [CreateTourComponent, TourListComponent ],
  imports: [
    CommonModule,
      //  ToursRoutingModule,
      FormsModule,
      Ng2SmartTableModule,
      FileUploadModule,
      FormsModule,
      ReactiveFormsModule,
      NgbModule,
      QuillModule,
      TagInputModule,
      HttpModule,
      NgSelectModule,
      SharedModule,
      ArchwizardModule,
  ]
})
export class ToursModule { }
