import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { StorageService } from '../../auth/services/storage.service';
import { logout } from '../../users/store/users.actions';
import { HouseEntityService } from '../services/house-entity.service';
import { MessageService } from '../services/message.service';
import { UserEntityService } from '../services/user-entity.service';

export interface ConfirmDialog{
    name: string,
    context:string,
    action:string,
    data: any
}
@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {
  title!: string;
  content!: string;
  action!: string;
  url!: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private dialog: MatDialog,
    private store: Store,
    private userEntityService: UserEntityService,
    private houseEntityService: HouseEntityService,
    private msg: MessageService,
    private storageService: StorageService
  ){
   
  }
  deleteUser(){
   return this.userEntityService.delete(this.dialogData.data._id).subscribe({
      next:(res)=>{        
    this.dialog.closeAll();
    if (this.dialogData.data._id === this.storageService.getId()) {
       this.store.dispatch(logout());
    }
    history.back();
    this.msg.message({
      title:'Delete Success',
      text:'Successfully removed '+ this.dialogData.data.userInfos.name,
      color:'green'
    });
    },
      error: err=>{
        this.msg.message({
          title:'Delete Failure',
          text:'Error '+ err.message,
          color:'red'
        })
      }
    });
  }
  deleteCaretaker(){
    console.log('houseId ', this.dialogData.estate._id);
    console.log('caretakerId ', this.dialogData.caretakerId);    
  }
}
