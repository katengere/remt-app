import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LenderRoutingModule } from './lender-routing.module';
import { LenderHomeComponent } from './lender-home/lender-home.component';
import { VerifyAddressComponent } from './verify-address/verify-address.component';


@NgModule({
  declarations: [
    LenderHomeComponent,
    VerifyAddressComponent
  ],
  imports: [
    CommonModule,
    LenderRoutingModule
  ]
})
export class LenderModule { }
