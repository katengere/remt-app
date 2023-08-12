import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaretakerRoutingModule } from './caretaker-routing.module';
import { CaretakerHomeComponent } from './caretaker-home/caretaker-home.component';


@NgModule({
  declarations: [
    CaretakerHomeComponent
  ],
  imports: [
    CommonModule,
    CaretakerRoutingModule
  ]
})
export class CaretakerModule { }
