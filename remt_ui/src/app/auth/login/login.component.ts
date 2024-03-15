import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/shared/services/message.service';
import { UserDataService } from 'src/app/shared/services/user-data.service';
import { UserTypeInterface } from 'src/app/users/types/userTypes';
import { environment } from '../../../environments/environment';
import { UserEntityService } from '../../shared/services/user-entity.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: UserTypeInterface = {
    userInfos: { name: '', phoneNumber: '', gender:'', summary:'', password:'', nation_Id: null, age: null },
    _id: '',
    userTypeName: '',
    permissions: [],
    estates: [],
    createdAt: new Date()
  }
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private router: Router,
    private msgService: MessageService,
    private userDataService: UserDataService,
    private userEntityService: UserEntityService,
    private dialog: MatDialog,
    private http: HttpClient
    ) {
    this.loginForm = this.formBuilder.group({
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin(){
    if (this.loginForm.valid) {
      this.http.post(environment.apiUrl+'/users/login', this.loginForm.value).subscribe({
        next:(user)=>{
          console.log(user);
          
          const token = user as unknown as string;
          const payload = JSON.parse(atob(token.split('.')[1]));
          console.log(payload);
          this.storageService.saveToken(token);
          this.dialog.closeAll();
          this.router.navigate([payload.userTypeName.toLowerCase(), payload._id]);
          this.msgService.message({
            title:'Login Success', 
            text: payload.name.toUpperCase()+', Wellcome to Real Estate Management Tanzania',
            color:'green'
          });
        },
        error:err=>{
          console.log(err);
          this.msgService.message({
            title:'Login Error', 
            text: err.statusText=="Unknown Error"? 'No internet connection' : typeof(err.error)=='string' ? err.error : err.message,
            color:'red'
          });
        }
      });
    } else {
      this.msgService.message({
        text:'Please make sure to fill all required fields!',
        title: 'Form Error',
        color:'red'
    });
    }
  }
}
