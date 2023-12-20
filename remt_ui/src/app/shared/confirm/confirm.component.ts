import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UserEntityService } from '../services/user-entity.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUrl } from 'src/app/users/store/users.selectors';
import { MessageService } from '../services/message.service';

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
    @Inject(MAT_DIALOG_DATA) public dialogData: ConfirmDialog,
    private userEntityService: UserEntityService,
    private dialog: MatDialog,
    private store: Store,
    private router: Router,
    private msg: MessageService
  ){
    this.store.select(selectUrl).subscribe({
      next:(url)=>{
        const urlSegments = url.split('/');
        urlSegments.pop();
        this.url = urlSegments.join('/');
      }
    });
  }
  deleteUser(id: string){
    this.userEntityService.delete(this.dialogData.data);
    this.dialog.closeAll();
    this.userEntityService.getAll();
    this.msg.message({
      title:'Delete Success',
      text:'Successfully removed '+ this.dialogData.data.userInfos.name,
      color:'green'
    })
    this.router.navigateByUrl(this.url);
  }
}
