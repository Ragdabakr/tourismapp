import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransportsRoutingModule } from './transports-routing.module';
import { TransportsComponent } from './transports/transports.component';

@NgModule({
  declarations: [TransportsComponent],
  imports: [
    CommonModule,
    TransportsRoutingModule
  ]
})
export class TransportsModule { }
