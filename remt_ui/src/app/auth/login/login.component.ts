import { Component, OnInit } from '@angular/core';
import { UserTypeInterface } from 'src/app/users/types/userTypes';
import { MessageService } from 'src/app/shared/services/message.service';
import { NgForm } from '@angular/forms';
import * as userActions from "../../users/store/users.actions";
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { UserEntityService } from '../../shared/services/user-entity.service';
import { UserDataService } from 'src/app/shared/services/user-data.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: UserTypeInterface = {
    userInfos: { name: '', phoneNumber: '', nationId: null, age: null },
    id: '',
    userTypeName: '',
    permissions: [],
    ui: {},
    estates: []
  }
  userTypeNames!: string[];
  constructor(
    private storageService: StorageService,
    private router: Router,
    private msgService: MessageService,
    private userDataService: UserDataService,
    private userEntityService: UserEntityService,
    private dialog: MatDialog
    ) {
    this.userEntityService.entities$.subscribe({
      next:(users)=>{
        this.userTypeNames= users.map(u=>u.userTypeName.toLowerCase())
          .filter((n,i,arr)=>arr.indexOf(n)==i);
      }
    });
  }

  registerDialog(){
    this.dialog.closeAll();
    this.dialog.open(RegisterComponent);
  }

  onLogin(form: NgForm){
    if (form.valid) {
      this.userDataService.add(this.user).subscribe({
        next:(user)=>{
          console.log(user);
          this.storageService.saveToken(user.userInfos.name, user.userTypeName);
          this.router.navigate([user.userTypeName.toLowerCase()])
          this.msgService.message({
            title:'Login Success', text: user.userInfos.name.toUpperCase()+', Wellcome to Real Estate Management Tanzania'
          }, 'bg-success');
        },
        error:err=>{
          console.log(err);
          this.msgService.message({
            title:'Login Error', text: err.statusText=="Unknown Error"? 'No internet connection' : typeof(err.error)=='string' ? err.error : err.message
          }, 'bg-success');
        }
      });
      form.resetForm();
      this.dialog.closeAll();
    } else {
      this.userEntityService.dispatch(userActions.loginFailure({
        error:{
          text:'Please make sure to fill all required fields!',
        title: 'Form Error'}
      }))
    }
  }
}
