import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppStateInterface, UserTypeInterface } from '../../types/userTypes';
import { selectUrl, userSelector } from '../../store/users.selectors';

@Component({
  selector: 'app-main-admin-home',
  templateUrl: './main-admin-home.component.html',
  styleUrls: ['./main-admin-home.component.css']
})
export class MainAdminHomeComponent implements OnInit {
  users!: UserTypeInterface[];
  constructor(
    private store: Store<AppStateInterface>
  ){
    this.store.pipe(select(userSelector)).subscribe({
      next:(users)=>this.users = users
    });

  }
  ngOnInit(): void {}
  openEditDialog(user:any){
    console.log(user);
  }
  delUser(user:any){
    console.log(user);
  }

}
