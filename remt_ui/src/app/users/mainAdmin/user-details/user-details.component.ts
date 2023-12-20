import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { exhaustMap } from 'rxjs';
import { RegisterComponent } from 'src/app/auth/register/register.component';
import { ConfirmComponent } from 'src/app/shared/confirm/confirm.component';
import { MessageService } from 'src/app/shared/services/message.service';
import { UserEntityService } from 'src/app/shared/services/user-entity.service';
import { UserTypeInterface } from '../../types/userTypes';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  regUserIds?: UserTypeInterface[];
  regEstateIds?: UserTypeInterface[];
  selectedUser?: UserTypeInterface;
  constructor(
    private userEntityService: UserEntityService,
    private activeRoute: ActivatedRoute,
    private route: Router,
    private dialog: MatDialog,
    private msg: MessageService
  ){ }
  ngOnInit() {
    this.activeRoute.params.pipe(exhaustMap((param:Params)=>this.userEntityService.getByKey(param['id']))).subscribe({
      next:(user)=>{
        this.selectedUser = user;
        if (user.regUserIds) {
          this.userEntityService.entities$.subscribe({
            next:(users)=>{
              this.regUserIds = user.regUserIds?.map(id=>users.find(u=>u.id==id)) as UserTypeInterface[];
            }
          });
        } else if(user.regEstateIds){
          this.userEntityService.entities$.subscribe({
            next:(users)=>{
              this.regEstateIds = user.regEstateIds?.map(id=>users.find(u=>u.id==id)) as UserTypeInterface[];
            }
          });
        }
      },
      error:(err)=>{        
        this.msg.message({title:'Incorrect Credentials', text:err.message, color:'red'});
      }
    });
  }

  editUser(){
    this.dialog.open(RegisterComponent, {data: {user:this.selectedUser, action:'Edit'}});
  }

  deleteUser(){
   this.dialog.open(ConfirmComponent, {
    data:{
    name: this.selectedUser?.userInfos.name,
    context:'User',
    action:'Delete',
    data: this.selectedUser
   }})   
  }
}
