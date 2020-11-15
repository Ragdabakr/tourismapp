import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TravelAgentsRoutingModule } from './travel-agents-routing.module';
import { TravelAgentsComponent } from './travel-agents/travel-agents.component';

@NgModule({
  declarations: [TravelAgentsComponent],
  imports: [
    CommonModule,
    TravelAgentsRoutingModule
  ]
})
export class TravelAgentsModule { }
