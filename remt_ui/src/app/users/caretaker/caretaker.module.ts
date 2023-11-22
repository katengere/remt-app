import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaretakerRoutingModule } from './caretaker-routing.module';
import { CaretakerHomeComponent } from './caretaker-home/caretaker-home.component';
import { MngTenantsComponent } from './mng-tenants/mng-tenants.component';
import { CreateInvoicesComponent } from './create-invoices/create-invoices.component';
import { RentalHistoryComponent } from './rental-history/rental-history.component';


@NgModule({
  declarations: [
    CaretakerHomeComponent,
    MngTenantsComponent,
    CreateInvoicesComponent,
    RentalHistoryComponent
  ],
  imports: [
    CommonModule,
    CaretakerRoutingModule
  ]
})
export class CaretakerModule { }
