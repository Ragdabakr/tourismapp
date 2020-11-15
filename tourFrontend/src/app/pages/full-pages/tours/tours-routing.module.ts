import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTourComponent } from './create-tour/create-tour.component';
import { FullPagesRoutingModule } from '../full-pages-routing.module';

const routes: Routes = [
  
];
@NgModule({
    imports: [RouterModule.forChild(routes) , FullPagesRoutingModule],
    exports: [RouterModule]
})


export class ToursRoutingModule { }
