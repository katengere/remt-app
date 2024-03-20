import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from '../../shared/profile/profile.component';
import { UserDetailsComponent } from '../mainAdmin/user-details/user-details.component';
import { LgaHomeComponent } from './lga-home/lga-home.component';
import { LgaIndexComponent } from './lga-index/lga-index.component';

const routes: Routes = [
  {
    path: '', component: LgaHomeComponent,
    children: [
      { path: '', component: LgaIndexComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'manage_users/:id', component: UserDetailsComponent },
      // {path:'add_landlords', component: AddLandlordsComponent},
      // {path:'add_properties', component: AddPropertiesComponent},
      { path: '**', redirectTo: '' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LGARoutingModule { }
