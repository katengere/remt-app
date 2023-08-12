import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserlayoutComponent } from 'src/app/shared/userlayout/userlayout.component';
import { CaretakerHomeComponent } from './caretaker-home/caretaker-home.component';

const routes: Routes = [{
  path:'', component:UserlayoutComponent,
  children:[
    {path:'', component: CaretakerHomeComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaretakerRoutingModule { }
