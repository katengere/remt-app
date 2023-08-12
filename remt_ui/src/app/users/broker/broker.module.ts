import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrokerRoutingModule } from './broker-routing.module';
import { BrokerHomeComponent } from './broker-home/broker-home.component';


@NgModule({
  declarations: [
    BrokerHomeComponent
  ],
  imports: [
    CommonModule,
    BrokerRoutingModule
  ]
})
export class BrokerModule { }
