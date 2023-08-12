import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LenderRoutingModule } from './lender-routing.module';
import { LenderHomeComponent } from './lender-home/lender-home.component';


@NgModule({
  declarations: [
    LenderHomeComponent
  ],
  imports: [
    CommonModule,
    LenderRoutingModule
  ]
})
export class LenderModule { }
