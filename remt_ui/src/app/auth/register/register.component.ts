import { Component, OnInit } from '@angular/core';
import { AppStateInterface, PersonInfoInterface } from 'src/app/users/types/userTypes';
import { PersonInfoService } from '../services/person-info.service';
import * as userActions from "../../users/store/users.actions";
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  remtUser: PersonInfoInterface = {
    name: '', age: 0, nationId: 0,
    phoneNumber: 0, userTypeName:''
  }
  constructor(
    private personInfoService: PersonInfoService,
    private store: Store<AppStateInterface>,
    ) { }

  ngOnInit(): void {
  }
  onRegister(){
    const {name, nationId, phoneNumber} = this.remtUser;
    if (!name  || !nationId) {
      return  this.store
      .dispatch(userActions.loginFailure({
        error:{
          text:'Please make sure to fill all required fields!',
        title: 'Form Error'}
      }));
    }
    return this.store.dispatch(userActions.register(this.remtUser));
  }
}
