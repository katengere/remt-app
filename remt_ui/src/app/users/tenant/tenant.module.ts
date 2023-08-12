import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantRoutingModule } from './tenant-routing.module';
import { TenantHomeComponent } from './tenant-home/tenant-home.component';


@NgModule({
  declarations: [
    TenantHomeComponent
  ],
  imports: [
    CommonModule,
    TenantRoutingModule
  ]
})
export class TenantModule { }
