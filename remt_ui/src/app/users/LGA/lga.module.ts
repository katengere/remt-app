import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '../../shared/shared.module';
import { AddLandlordsComponent } from './add-landlords/add-landlords.component';
import { AddPropertiesComponent } from './add-properties/add-properties.component';
import { LgaHomeComponent } from './lga-home/lga-home.component';
import { LgaIndexComponent } from './lga-index/lga-index.component';
import { LGARoutingModule } from './lga-routing.module';

@NgModule({
  declarations: [
    LgaHomeComponent,
    AddLandlordsComponent,
    AddPropertiesComponent,
    LgaIndexComponent,
  ],
  imports: [
    CommonModule,
    LGARoutingModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    SharedModule,
    FormsModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatGridListModule,
    MatDialogModule,
    MatMenuModule]
})
export class LGAModule {}
