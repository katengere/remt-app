import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardIndexComponent } from './dashboard-index/dashboard-index.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { DashboardOrderComponent } from './dashboard-order/dashboard-order.component';
import { DashboardProfileComponent } from './dashboard-profile/dashboard-profile.component';
import { DashboardSavedItemComponent } from './dashboard-saved-item/dashboard-saved-item.component';
import { AdminNgxChartComponent } from './admin-ngx-chart/admin-ngx-chart.component';

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
  },
  {
    path: 'dashboard/charts',
    component: AdminNgxChartComponent
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
export class DashboardRoutingModule {}
