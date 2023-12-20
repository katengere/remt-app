import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantRoutingModule } from './tenant-routing.module';
import { TenantHomeComponent } from './tenant-home/tenant-home.component';
import { RentalHistoryComponent } from './rental-history/rental-history.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { AutoPaymentsComponent } from './auto-payments/auto-payments.component';
import { MngRentalPaymentsComponent } from './mng-rental-payments/mng-rental-payments.component';


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
    TenantRoutingModule
  ]
})
export class TenantModule { }
