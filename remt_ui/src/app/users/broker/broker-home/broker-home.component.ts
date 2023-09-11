import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppStateInterface, UserTypeInterface } from '../../types/userTypes';
import { userSelector } from '../../store/users.selectors';

@Component({
  selector: 'app-broker-home',
  templateUrl: './broker-home.component.html',
  styleUrls: ['./broker-home.component.css']
})
export class BrokerHomeComponent implements OnInit {
  users!: UserTypeInterface[];
  constructor(
    private store: Store<AppStateInterface>
  ){
    this.store.pipe(select(userSelector)).subscribe({
      next:(users)=>{
        this.users = users.filter(u=>u.estates?.length);

        console.log(this.users);

      }
    });
  }

  ngOnInit(): void {
  }

}
