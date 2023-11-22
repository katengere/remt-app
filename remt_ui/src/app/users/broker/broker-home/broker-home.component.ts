import { Component, OnInit } from '@angular/core';
import { UserTypeInterface } from '../../types/userTypes';
import { UserEntityService } from 'src/app/shared/services/user-entity.service';

@Component({
  selector: 'app-broker-home',
  templateUrl: './broker-home.component.html',
  styleUrls: ['./broker-home.component.css']
})
export class BrokerHomeComponent {
  users!: UserTypeInterface[];
  constructor(
    private userEntityService: UserEntityService
  ){
    this.userEntityService.entities$.subscribe({
      next:(users)=>{
        this.users = users.filter(u=>u.estates!=null);
        console.log(this.users);        
      }
    });
  }

}
