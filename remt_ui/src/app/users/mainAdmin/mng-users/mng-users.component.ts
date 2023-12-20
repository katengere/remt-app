import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { merge } from 'rxjs';
import { UserEntityService } from 'src/app/shared/services/user-entity.service';
import { UserTypeInterface } from '../../types/userTypes';

interface GroupedUsers {
  userTypeName:string;
  users:UserTypeInterface[]
}

@Component({
  selector: 'app-mng-users',
  templateUrl: './mng-users.component.html',
  styleUrls: ['./mng-users.component.css']
})
export class MngUsersComponent {
  paramId!: string;
  users!: GroupedUsers[];
  constructor(
    private userEntityService: UserEntityService,
    private route: ActivatedRoute
  ){
    merge(this.userEntityService.entities$, this.userEntityService.filteredEntities$).subscribe({
      next:(users)=>{      
        this.paramId = this.route.snapshot.parent?.params['id'];  
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
        console.log(users);
        
      }
    }); 
    
  }

 
}
