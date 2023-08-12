import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { userSelector } from 'src/app/users/store/users.selectors';
import { AppStateInterface, UserTypeInterface } from 'src/app/users/types/userTypes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {name:'',password:'', userTypeName:''}
  user$!: UserTypeInterface[];
  constructor(private store: Store<AppStateInterface>) {
    this.store.pipe(select(userSelector)).subscribe({
      next:(users)=>this.user$ = users
    });
  }

  ngOnInit(): void {
  }
  onSubmit(form:any){}

}
