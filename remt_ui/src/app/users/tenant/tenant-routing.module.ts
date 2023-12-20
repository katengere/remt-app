import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserlayoutComponent } from 'src/app/shared/userlayout/userlayout.component';
import { TenantHomeComponent } from './tenant-home/tenant-home.component';
import { MngRentalPaymentsComponent } from './mng-rental-payments/mng-rental-payments.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { RentalHistoryComponent } from './rental-history/rental-history.component';
import { AutoPaymentsComponent } from './auto-payments/auto-payments.component';

const routes: Routes = [{
  path:'', component:UserlayoutComponent,
  children:[
    {path:'', component: TenantHomeComponent},
    {path:'manage_rental_payments', component: MngRentalPaymentsComponent},
    {path:'request_invoices', component: InvoicesComponent},
    {path:'view_rental_history', component: RentalHistoryComponent},
    {path:'set_up_auto_payments', component: AutoPaymentsComponent},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantRoutingModule { }
