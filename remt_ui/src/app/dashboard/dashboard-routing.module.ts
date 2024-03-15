import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { DashboardOrderComponent } from './dashboard-order/dashboard-order.component';
import { DashboardProfileComponent } from './dashboard-profile/dashboard-profile.component';
import { DashboardSavedItemComponent } from './dashboard-saved-item/dashboard-saved-item.component';

const DashboardChildrenRoute: Routes = [
  {
    path: 'dashboard/broker/:id',
    component: DashboardSavedItemComponent
  },
  {
    path: 'dashboard/profile',
    component: DashboardProfileComponent
  },
  {
    path: 'dashboard/about',
    component: DashboardOrderComponent
  }
];

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: DashboardChildrenRoute
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
