import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserlayoutComponent } from 'src/app/shared/userlayout/userlayout.component';
import { ProfileComponent } from '../../shared/profile/profile.component';
import { CreateInvoicesComponent } from '../caretaker/create-invoices/create-invoices.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandlordHomeComponent } from './landlord-home/landlord-home.component';
import { MngCaretakersComponent } from './mng-caretakers/mng-caretakers.component';
import { MngPropertiesComponent } from './mng-properties/mng-properties.component';
import { MngTenantsComponent } from './mng-tenants/mng-tenants.component';
import { RentalHistoryComponent } from './rental-history/rental-history.component';

const routes: Routes = [{
  path: '', component: UserlayoutComponent,
  children: [
    {
      path: '', component: LandlordHomeComponent, children: [
        { path: '', component: DashboardComponent },
        { path: 'profile', component: ProfileComponent },
        { path: 'manage_properties', component: MngPropertiesComponent },
        { path: 'manage_tenants', component: MngTenantsComponent },
        { path: 'manage_caretakers', component: MngCaretakersComponent },
        { path: 'view_rental_history', component: RentalHistoryComponent },
        { path: 'create_invoices', component: CreateInvoicesComponent }
      ]
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandlordRoutingModule { }
