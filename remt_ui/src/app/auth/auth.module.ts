import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from "@angular/material/dialog";
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
        SharedModule,
        MatCardModule,
        MatDialogModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,MatGridListModule, MatButtonModule, MatDialogModule
    ],
    providers:[
      StorageService
    ]
})
export class AuthModule { }
