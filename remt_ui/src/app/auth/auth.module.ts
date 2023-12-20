import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from "@angular/material/dialog";
import { StorageService } from './services/storage.service';

import { ENTITY_METADATA_TOKEN, EntityDataService } from '@ngrx/data';


@NgModule({
    declarations: [
       LoginComponent,
       RegisterComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        SharedModule,
        FormsModule,
        MatCardModule,
        MatDialogModule,
        MatSelectModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,MatGridListModule, MatButtonModule
    ],
    providers:[
    StorageService,
  ]
})
export class AuthModule {
  
}
