import { Component, OnInit, ViewChild } from '@angular/core';
import { HouseInterface, UserTypeInterface } from '../../types/userTypes';
import { UserEntityService } from 'src/app/shared/services/user-entity.service';
import { merge } from 'rxjs';

interface GroupedUsers {
  name:string;
  value:number;
}
export interface GroupedEstates {
  name:string;
  value:number;
}

@Component({
  selector: 'app-main-admin-home',
  templateUrl: './main-admin-home.component.html',
  styleUrls: ['./main-admin-home.component.css']
})
export class MainAdminHomeComponent implements OnInit {
  estates!: GroupedEstates[];
  users!: GroupedUsers[];
  constructor(
    private userEntityService: UserEntityService
  ){
    merge(this.userEntityService.entities$, this.userEntityService.filteredEntities$).subscribe({
      next:(users)=>{

        this.estates = users.filter(u=>u.estates!.length>1)
        .reduce((accumulator, currentValue: UserTypeInterface) =>{
          if (accumulator!==null) {
            return [...accumulator, ...currentValue.estates as HouseInterface[]]
          } 
          return [...accumulator]
        }, [] as HouseInterface[])
        .reduce((acc:GroupedEstates[], obj:HouseInterface)=>{
          let loc = obj.address.street.toLowerCase();
          let groupedEstates: GroupedUsers = {name:loc, value:0}
          if (!acc.includes(acc[acc.findIndex(u=>u.name.toLowerCase()==obj.address.street.toLowerCase())])) {
            groupedEstates.value += 1;
            return [...acc, groupedEstates]
          }
          const found = acc.find(u=>u.name.toLowerCase()==obj.address.street.toLowerCase());
          if (found) {
            found.value += 1;
            acc.splice(acc.findIndex(u=>u.name.toLowerCase()==found.name.toLowerCase()), 1, found)
            return [...acc];
          }
          return acc
        }, [] as GroupedEstates[]);
        
        
        this.users = users.reduce((acc:GroupedUsers[], obj:UserTypeInterface)=>{
          let uTN = obj.userTypeName.toLowerCase();
          let groupedUser: GroupedUsers = {name:uTN, value:0}
          if (!acc.includes(acc[acc.findIndex(u=>u.name.toLowerCase()==obj.userTypeName.toLowerCase())])) {
            groupedUser.value += 1;
            return [...acc, groupedUser]
          }
          const found = acc.find(u=>u.name.toLowerCase()==obj.userTypeName.toLowerCase());
          if (found) {
            found.value += 1;
            acc.splice(acc.findIndex(u=>u.name.toLowerCase()==found.name.toLowerCase()), 1, found)
            return [...acc];
          }
          return acc
        }, [] as GroupedUsers[]);
      }
    });     
  }
  
  ngOnInit(): void {}

}
