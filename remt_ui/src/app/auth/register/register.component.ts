import { Component } from '@angular/core';
import { AppStateInterface, UserTypeInterface } from 'src/app/users/types/userTypes';
import * as userActions from "../../users/store/users.actions";
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { UserDataService } from 'src/app/shared/services/user-data.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/shared/services/message.service';
import { UserEntityService } from 'src/app/shared/services/user-entity.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  remtUser: UserTypeInterface = {
    id: '',
    userTypeName: '',
    permissions: [],
    ui: {},
    userInfos: {
      name: '', age: null, nationId: null,
      phoneNumber: ''
    },
    estates: []
  };
  userTypeNames!: string[];
  constructor(
    private storageService: StorageService,
    private router: Router,
    private msgService: MessageService,
    private store: Store<AppStateInterface>,
    private userEntityService: UserEntityService,
    private userDataService: UserDataService,
    private dialog: MatDialog
    ) { 
      this.userEntityService.entities$.subscribe({
        next:(users)=>{
          this.userTypeNames= users.map(u=>u.userTypeName.toLowerCase())
            .filter((n,i,arr)=>arr.indexOf(n)==i);
        }
      });
  }

  loginDialog(){
    this.dialog.closeAll();
    this.dialog.open(LoginComponent);
  }
  onRegister(){
    const {name, nationId, phoneNumber, age, } = this.remtUser.userInfos;
    if (!name  || !nationId) {
      return  this.store.dispatch(userActions.loginFailure({
                  error:{
                      text:'Please make sure to fill all required fields!',
                      title: 'Form Error'}
                  }));
              }
          this.dialog.closeAll();
      return this.userDataService.add(this.remtUser).subscribe({
        next:(user)=>{
          console.log(user);
          this.storageService.saveToken(user.userInfos.name, user.userTypeName);
          this.router.navigate([user.userTypeName.toLowerCase()]);
          this.userEntityService.getAll();
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
  }
}
