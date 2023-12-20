import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MainAdminRoutingModule } from './main-admin-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MainAdminHomeComponent } from './main-admin-home/main-admin-home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from "@angular/material/list";
import { SharedModule } from 'src/app/shared/shared.module';
import { MngUsersComponent } from './mng-users/mng-users.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    MainAdminHomeComponent,
    MngUsersComponent,
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    MainAdminRoutingModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    SharedModule,
    NgxChartsModule
  ]
})
export class MainAdminModule { }
