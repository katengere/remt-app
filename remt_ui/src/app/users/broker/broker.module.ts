import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrokerRoutingModule } from './broker-routing.module';
import { BrokerHomeComponent } from './broker-home/broker-home.component';
import { RecruitTenantsComponent } from './recruit-tenants/recruit-tenants.component';


@NgModule({
  declarations: [
    BrokerHomeComponent,
    RecruitTenantsComponent
  ],
  imports: [
    CommonModule,
    BrokerRoutingModule
  ]
})
export class BrokerModule { }
