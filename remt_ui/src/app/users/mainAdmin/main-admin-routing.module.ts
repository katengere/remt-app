import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainAdminHomeComponent } from './main-admin-home/main-admin-home.component';
import { UserlayoutComponent } from 'src/app/shared/userlayout/userlayout.component';

const routes: Routes = [
  {
    path:'', component:UserlayoutComponent,
    children:[
      {path:'', component: MainAdminHomeComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainAdminRoutingModule { }