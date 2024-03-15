import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { AutoPaymentsComponent } from './auto-payments/auto-payments.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { MngRentalPaymentsComponent } from './mng-rental-payments/mng-rental-payments.component';
import { RentalHistoryComponent } from './rental-history/rental-history.component';
import { TenantHomeComponent } from './tenant-home/tenant-home.component';
import { TenantRoutingModule } from './tenant-routing.module';


@NgModule({
  declarations: [
    TenantHomeComponent,
    RentalHistoryComponent,
    InvoicesComponent,
    AutoPaymentsComponent,
    MngRentalPaymentsComponent
  ],
  imports: [
    CommonModule,
    TenantRoutingModule,
    SharedModule
  ]
})
export class TenantModule { }
