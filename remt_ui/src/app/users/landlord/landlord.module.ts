import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LandlordRoutingModule } from './landlord-routing.module';

import { LandlordHomeComponent } from './landlord-home/landlord-home.component';
import { MngPropertiesComponent } from './mng-properties/mng-properties.component';
import { MngTenantsComponent } from './mng-tenants/mng-tenants.component';
import { MngCaretakersComponent } from './mng-caretakers/mng-caretakers.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { RentalHistoryComponent } from './rental-history/rental-history.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatInputModule } from '@angular/material/input';

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
    LandlordRoutingModule,
    NgxChartsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSlideToggleModule,
    MatInputModule
  ]
})
export class LandlordModule { }
