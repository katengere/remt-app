import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppStateInterface, UserTypeInterface } from '../../types/userTypes';
import { selectUrl, userSelector } from '../../store/users.selectors';
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
    private store: Store<AppStateInterface>
  ){
    this.store.pipe(select(userSelector)).subscribe({
      next:(users)=>{
        this.users = users.reduce((acc:GroupedUsers[], obj:UserTypeInterface)=>{
          let uTN = obj.userTypeName;
          let groupedUser: GroupedUsers = {userTypeName:uTN, users:[]}
          if (!acc.includes(acc[acc.findIndex(u=>u.userTypeName==obj.userTypeName)])) {
            groupedUser.users.push(obj);
            return [...acc, groupedUser]
          }
          const found = acc.find(u=>u.userTypeName==obj.userTypeName);
          if (found) {
            found.users.push(obj);
            acc.splice(acc.findIndex(u=>u.userTypeName==found.userTypeName), 1, found)
            return [...acc];
          }
          return acc
        }, [] as GroupedUsers[]);
        console.log(this.users);
      }
    });
  }
  ngOnInit(): void {}

}
