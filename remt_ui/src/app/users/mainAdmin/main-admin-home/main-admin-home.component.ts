import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { UserEntityService } from 'src/app/shared/services/user-entity.service';
import { StorageService } from '../../../auth/services/storage.service';
import { HouseInterface, UserTypeInterface } from '../../types/userTypes';

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
  usersTotalByAdmin: number = 0;
  usersTotal: number = 0;
  estatesTotal: number = 0;
  constructor(
    private userEntityService: UserEntityService,
    public storageService: StorageService
  ){
    combineLatest([this.userEntityService.getByKey(storageService.getId()), userEntityService.entities$]).subscribe({
      next:([user, users])=>{
        this.usersTotalByAdmin = user.regUserIds?.length as number;
        this.usersTotal = users.length as number;
        this.estatesTotal = user.regEstateIds!.reduce((pv,cv)=>{
          return pv+cv!.length
        },0 as number);
        this.estates = user.estates.reduce((accumulator:any, currentValue: UserTypeInterface) =>{
          if (accumulator!==null) {
            return [...accumulator, ...currentValue.estates as HouseInterface[]]
          } 
          return [...accumulator]
        }, [] as HouseInterface[])
        .reduce((acc:GroupedEstates[], obj:HouseInterface)=>{
          let loc = obj.street.toLowerCase();
          let groupedEstates: GroupedUsers = {name:loc, value:0}
          if (!acc.includes(acc[acc.findIndex(u=>u.name.toLowerCase()==obj.street.toLowerCase())])) {
            groupedEstates.value += 1;
            return [...acc, groupedEstates]
          }
          const found = acc.find(u=>u.name.toLowerCase()==obj.street.toLowerCase());
          if (found) {
            found.value += 1;
            acc.splice(acc.findIndex(u=>u.name.toLowerCase()==found.name.toLowerCase()), 1, found)
            return [...acc];
          }
          return acc
        }, [] as GroupedEstates[]);
        
        
        this.users = user.regUserIds!.reduce((acc:GroupedUsers[], obj:UserTypeInterface)=>{
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
  
  ngOnInit() {}

}
