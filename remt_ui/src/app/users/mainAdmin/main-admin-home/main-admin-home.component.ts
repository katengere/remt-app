import { Component, OnInit, ViewChild } from '@angular/core';
import { UserTypeInterface } from '../../types/userTypes';
import { UserEntityService } from 'src/app/shared/services/user-entity.service';
import { merge } from 'rxjs';

interface GroupedUsers {
  userTypeName:string;
  users:UserTypeInterface[]
}
@Component({
  selector: 'app-main-admin-home',
  templateUrl: './main-admin-home.component.html',
  styleUrls: ['./main-admin-home.component.css']
})
export class MainAdminHomeComponent implements OnInit {
  users!: GroupedUsers[];
  constructor(
    private userEntityService: UserEntityService
  ){
    merge(this.userEntityService.entities$, this.userEntityService.filteredEntities$).subscribe({
      next:(users)=>{
        console.log(users);
        
        this.users = users.reduce((acc:GroupedUsers[], obj:UserTypeInterface)=>{
          let uTN = obj.userTypeName.toLowerCase();
          let groupedUser: GroupedUsers = {userTypeName:uTN, users:[]}
          if (!acc.includes(acc[acc.findIndex(u=>u.userTypeName.toLowerCase()==obj.userTypeName.toLowerCase())])) {
            groupedUser.users.push(obj);
            return [...acc, groupedUser]
          }
          const found = acc.find(u=>u.userTypeName.toLowerCase()==obj.userTypeName.toLowerCase());
          if (found) {
            found.users.push(obj);
            acc.splice(acc.findIndex(u=>u.userTypeName.toLowerCase()==found.userTypeName.toLowerCase()), 1, found)
            return [...acc];
          }
          return acc
        }, [] as GroupedUsers[]);
      }
    }); 
    
  }
  ngOnInit(): void {}

}
