import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserlayoutComponent } from 'src/app/shared/userlayout/userlayout.component';
import { BrokerHomeComponent } from './broker-home/broker-home.component';

const routes: Routes = [
  {
    path:'', component:UserlayoutComponent,
    children:[
      {path:'', component: BrokerHomeComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrokerRoutingModule { }
