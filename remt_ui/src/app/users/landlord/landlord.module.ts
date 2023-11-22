import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandlordRoutingModule } from './landlord-routing.module';
import { LandlordHomeComponent } from './landlord-home/landlord-home.component';
import { MngPropertiesComponent } from './mng-properties/mng-properties.component';
import { MngTenantsComponent } from './mng-tenants/mng-tenants.component';
import { MngCaretakersComponent } from './mng-caretakers/mng-caretakers.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { RentalHistoryComponent } from './rental-history/rental-history.component';


@NgModule({
  declarations: [
    LandlordHomeComponent,
    MngPropertiesComponent,
    MngTenantsComponent,
    MngCaretakersComponent,
    InvoicesComponent,
    RentalHistoryComponent
  ],
  imports: [
    CommonModule,
    LandlordRoutingModule
  ]
})
export class LandlordModule { }
