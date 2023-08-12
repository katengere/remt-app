import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LgaHomeComponent } from './lga-home/lga-home.component';
import { UserlayoutComponent } from 'src/app/shared/userlayout/userlayout.component';

const routes: Routes = [
  {path:'', component:UserlayoutComponent,
  children:[
    {path:'', component: LgaHomeComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LGARoutingModule { }
