import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserlayoutComponent } from 'src/app/shared/userlayout/userlayout.component';
import { ProfileComponent } from '../../shared/profile/profile.component';
import { LenderHomeComponent } from './lender-home/lender-home.component';
import { VerifyAddressComponent } from './verify-address/verify-address.component';

const routes: Routes = [{
  path: '', component: UserlayoutComponent,
  children: [
    { path: '', component: LenderHomeComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'verify_address', component: VerifyAddressComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LenderRoutingModule { }
