import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TravellersRoutingModule } from './travellers-routing.module';
import { TravellersComponent } from './travellers/travellers.component';
import { HotelsComponent } from './hotels/hotels.component';

@NgModule({
  declarations: [TravellersComponent, HotelsComponent],
  imports: [
    CommonModule,
    TravellersRoutingModule
  ]
})
export class TravellersModule { }
