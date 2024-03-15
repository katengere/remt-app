import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { SharedModule } from "../shared/shared.module";
import { AuthRoutingModule } from './auth-routing.module';
import { StorageService } from './services/storage.service';



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
        MatInputModule,MatGridListModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule
    ],
    providers:[
    StorageService,
  ]
})
export class AuthModule {
  
}
