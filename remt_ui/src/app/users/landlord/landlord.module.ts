import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LandlordRoutingModule } from './landlord-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { LandlordHomeComponent } from './landlord-home/landlord-home.component';
import { MngCaretakersComponent } from './mng-caretakers/mng-caretakers.component';
import { MngPropertiesComponent } from './mng-properties/mng-properties.component';
import { MngTenantsComponent } from './mng-tenants/mng-tenants.component';
import { RentalFormComponent } from './rental-form/rental-form.component';
import { RentalHistoryComponent } from './rental-history/rental-history.component';

@NgModule({
  declarations: [
    LandlordHomeComponent,
    MngPropertiesComponent,
    MngTenantsComponent,
    MngCaretakersComponent,
    InvoicesComponent,
    RentalHistoryComponent,
    RentalFormComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    LandlordRoutingModule,
    NgxChartsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    SharedModule
  ]
})
export class LandlordModule { }
