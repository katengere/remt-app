import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { BrokerHomeComponent } from './users/broker/broker-home/broker-home.component';
import { LazyLoadGuard } from './users/guards/lazy-load.guard';
import { BrokerDetailsComponent } from './shared/broker-details/broker-details.component';
import { LandlordDetailsComponent } from './shared/landlord-details/landlord-details.component';
import { DashboardLayoutComponent } from './dashboard/dashboard-layout/dashboard-layout.component';
import { DashboardIndexComponent } from './dashboard/dashboard-index/dashboard-index.component';


const routes: Routes = [
  { 
    path:'', 
    redirectTo:'dashboard/broker', pathMatch:'full'
  },
  { 
    path:'dashboard/broker', 
    component:DashboardLayoutComponent,
    children:[{path:'', component:DashboardIndexComponent}]
  },
  {
    path:'lga',
    loadChildren:()=>import('./users/LGA/lga.module').then(m=>m.LGAModule),
    canMatch:[LazyLoadGuard('lga')]
  },
  {
    path:'admin',
    loadChildren:()=>import('./users/mainAdmin/main-admin.module').then(m=>m.MainAdminModule),
    canMatch:[LazyLoadGuard('admin')]
  },
  {
    path:'broker',
    loadChildren:()=>import('./users/broker/broker.module').then(m=>m.BrokerModule),
    canMatch:[LazyLoadGuard('broker')]
  },
  {
    path:'landlord',
    loadChildren:()=>import('./users/landlord/landlord.module').then(m=>m.LandlordModule),
    canMatch:[LazyLoadGuard('landlord')]
  },
  {
    path:'caretaker',
    loadChildren:()=>import('./users/caretaker/caretaker.module').then(m=>m.CaretakerModule),
    canMatch:[LazyLoadGuard('caretaker')]
  },
  {
    path:'lender',
    loadChildren:()=>import('./users/lender/lender.module').then(m=>m.LenderModule),
    canMatch:[LazyLoadGuard('lender')]
  },
  {
    path:'tenant',
    loadChildren:()=>import('./users/tenant/tenant.module').then(m=>m.TenantModule),
    canMatch:[LazyLoadGuard('tenant')]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
