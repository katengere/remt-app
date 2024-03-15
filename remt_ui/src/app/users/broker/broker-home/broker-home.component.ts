import { Component } from '@angular/core';
import { UserDataService } from '../../../shared/services/user-data.service';
import { UserTypeInterface } from '../../types/userTypes';

@Component({
  selector: 'app-broker-home',
  templateUrl: './broker-home.component.html',
  styleUrls: ['./broker-home.component.css']
})
export class BrokerHomeComponent {
  users!: UserTypeInterface[];
  constructor(
    private userDataService: UserDataService
  ){
    this.userDataService.getAll().subscribe({
      next:(users)=>{
        this.users = users.filter(u=>u.estates!=null);
      }
    });
  }

}
