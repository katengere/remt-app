import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BrokerHomeComponent } from './users/broker/broker-home/broker-home.component';


const routes: Routes = [
  {path:'', component:HomeComponent,
children: [
  {path:'', component:BrokerHomeComponent}
]
},
  {
    path:'lga',
    loadChildren:()=>import('./users/LGA/lga.module').then(m=>m.LGAModule)
  },
  {
    path:'admin',
    loadChildren:()=>import('./users/mainAdmin/main-admin.module').then(m=>m.MainAdminModule)
  },
  {
    path:'broker',
    loadChildren:()=>import('./users/broker/broker.module').then(m=>m.BrokerModule)
  },
  {
    path:'landlord',
    loadChildren:()=>import('./users/landlord/landlord.module').then(m=>m.LandlordModule)
  },
  {
    path:'caretaker',
    loadChildren:()=>import('./users/caretaker/caretaker.module').then(m=>m.CaretakerModule)
  },
  {
    path:'lender',
    loadChildren:()=>import('./users/lender/lender.module').then(m=>m.LenderModule)
  },
  {
    path:'tenant',
    loadChildren:()=>import('./users/tenant/tenant.module').then(m=>m.TenantModule)
  },
  {
    path:'auth',
    loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
