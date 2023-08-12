import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LGARoutingModule } from './lga-routing.module';
import { LgaHomeComponent } from './lga-home/lga-home.component';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [
    LgaHomeComponent,
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
