import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SharedModule } from '../../shared/shared.module';
import { CaretakerHomeComponent } from './caretaker-home/caretaker-home.component';
import { CaretakerRoutingModule } from './caretaker-routing.module';
import { CreateInvoicesComponent } from './create-invoices/create-invoices.component';
import { MngTenantsComponent } from './mng-tenants/mng-tenants.component';
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
    NgxChartsModule,
    CaretakerRoutingModule,
    SharedModule,
    MatMenuModule,
    MatIconModule
  ]
})
export class CaretakerModule { }
