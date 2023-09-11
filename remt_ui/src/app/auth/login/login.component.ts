import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { userSelector } from 'src/app/users/store/users.selectors';
import { AppStateInterface, PersonInfoInterface, UserTypeInterface } from 'src/app/users/types/userTypes';
import { StorageService } from '../services/storage.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { PersonInfoService } from '../services/person-info.service';
import { NgForm } from '@angular/forms';
import * as userActions from "../../users/store/users.actions";
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: PersonInfoInterface = {name:'',phoneNumber:0,nationId:0,age:0}
  user$!: UserTypeInterface[];
  constructor(
    private store: Store<AppStateInterface>,
    private msgService: MessageService,
    private dialog: MatDialog
    ) {
    this.store.pipe(select(userSelector)).subscribe({
      next:(users)=>this.user$ = users
    });
  }

  ngOnInit(): void {}

  registerDialog(){
    this.dialog.closeAll();
    this.dialog.open(RegisterComponent);
  }

  onLogin(form: NgForm){
    if (form.valid) {
    //   this.userService.login(this.user).subscribe({
    //     next:user=>{
    //       this.storageService.saveToken(user.userInfos.name);
    //       this.msgService.message({title:'SUCCESS', text:'Wellcome '+ user.userInfos.name.toUpperCase()}, 'bg-success');
    //     },
    //     error:err=>{
    //       this.msgService.message({title:'SERVER ERROR' ,text: err.error.message}, 'bg-danger')
    //     }
    // })
      ;
      this.store.dispatch(userActions.login(this.user));
      form.resetForm();
      this.dialog.closeAll();
    } else {
      this.store
      .dispatch(userActions.loginFailure({
        error:{
          text:'Please make sure to fill all required fields!',
        title: 'Form Error'}
      }));
    }

  }

}
