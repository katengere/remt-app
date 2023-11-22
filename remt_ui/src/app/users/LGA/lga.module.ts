import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LGARoutingModule } from './lga-routing.module';
import { LgaHomeComponent } from './lga-home/lga-home.component';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AddLandlordsComponent } from './add-landlords/add-landlords.component';
import { AddPropertiesComponent } from './add-properties/add-properties.component';


@NgModule({
  declarations: [
    LgaHomeComponent,
    AddLandlordsComponent,
    AddPropertiesComponent,
  ],
  imports: [
    CommonModule,
    LGARoutingModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule
  ]
})
export class LGAModule { }
