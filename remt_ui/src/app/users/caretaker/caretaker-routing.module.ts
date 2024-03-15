import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserlayoutComponent } from 'src/app/shared/userlayout/userlayout.component';
import { ProfileComponent } from '../../shared/profile/profile.component';
import { CaretakerHomeComponent } from './caretaker-home/caretaker-home.component';
import { CreateInvoicesComponent } from './create-invoices/create-invoices.component';
import { MngTenantsComponent } from './mng-tenants/mng-tenants.component';
import { RentalHistoryComponent } from './rental-history/rental-history.component';

const routes: Routes = [{
  path: '', component: UserlayoutComponent,
  children: [
    { path: 'manage_tenants', component: MngTenantsComponent },
    { path: 'view_rental_history', component: RentalHistoryComponent },
    { path: 'create_invoices', component: CreateInvoicesComponent },
    { path: '', component: CaretakerHomeComponent },
    { path: 'profile', component: ProfileComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaretakerRoutingModule { }
