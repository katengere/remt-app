import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserlayoutComponent } from 'src/app/shared/userlayout/userlayout.component';
import { TenantHomeComponent } from './tenant-home/tenant-home.component';

const routes: Routes = [{
  path:'', component:UserlayoutComponent,
  children:[
    {path:'', component: TenantHomeComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantRoutingModule { }
