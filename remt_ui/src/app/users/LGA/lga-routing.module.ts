import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LgaHomeComponent } from './lga-home/lga-home.component';
import { UserlayoutComponent } from 'src/app/shared/userlayout/userlayout.component';
import { AddPropertiesComponent } from './add-properties/add-properties.component';
import { AddLandlordsComponent } from './add-landlords/add-landlords.component';

const routes: Routes = [
  {path:'', component:UserlayoutComponent,
  children:[
    {path:'', component: LgaHomeComponent},
    {path:'add_landlords', component: AddLandlordsComponent},
    {path:'add_properties', component: AddPropertiesComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LGARoutingModule { }
