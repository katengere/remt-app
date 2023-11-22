import { Component, OnInit } from '@angular/core';
import { UserEntityService } from 'src/app/shared/services/user-entity.service';
import { UserTypeInterface } from 'src/app/users/types/userTypes';

@Component({
  selector: 'll-dashboard-index',
  templateUrl: './dashboard-index.component.html',
  styleUrls: ['./dashboard-index.component.css']
})
export class DashboardIndexComponent {
  users!: UserTypeInterface[];
  constructor(
    private userEntityService: UserEntityService
  ){
    this.userEntityService.entities$.subscribe({
      next:(users)=>{
        this.users = users.filter(u=>u.estates!.length>1);
        console.log(this.users);        
      }
    });
  }
}
