import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BrokerHomeComponent } from './users/broker/broker-home/broker-home.component';
import { LazyLoadGuard } from './users/guards/lazy-load.guard';


const routes: Routes = [
  {path:'', component:HomeComponent,
children: [
  {path:'', component:BrokerHomeComponent}
]
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
  },
  {
    path:'auth',
    loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule),
    canMatch:[LazyLoadGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
