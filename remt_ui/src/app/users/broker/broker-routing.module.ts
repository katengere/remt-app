import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserlayoutComponent } from 'src/app/shared/userlayout/userlayout.component';
import { ProfileComponent } from '../../shared/profile/profile.component';
import { BrokerHomeComponent } from './broker-home/broker-home.component';
import { RecruitTenantsComponent } from './recruit-tenants/recruit-tenants.component';

const routes: Routes = [
  {
    path: '', component: UserlayoutComponent,
    children: [
      { path: '', component: BrokerHomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'recruit_tenants', component: RecruitTenantsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrokerRoutingModule { }
