import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserlayoutComponent } from 'src/app/shared/userlayout/userlayout.component';
import { ProfileComponent } from '../../shared/profile/profile.component';
import { MainAdminHomeComponent } from './main-admin-home/main-admin-home.component';
import { MngUsersComponent } from './mng-users/mng-users.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  {
    path: '', component: UserlayoutComponent,
    children: [
      { path: '', component: MainAdminHomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'manage_users', component: MngUsersComponent },
      { path: 'manage_users/:id', component: UserDetailsComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainAdminRoutingModule { }
