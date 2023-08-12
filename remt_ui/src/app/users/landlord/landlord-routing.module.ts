import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserlayoutComponent } from 'src/app/shared/userlayout/userlayout.component';
import { LandlordHomeComponent } from './landlord-home/landlord-home.component';

const routes: Routes = [{
  path:'', component:UserlayoutComponent,
  children:[
    {path:'', component: LandlordHomeComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandlordRoutingModule { }
