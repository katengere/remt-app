import { Injectable} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Message } from 'src/app/users/types/message';
import { MessageComponent } from '../message/message.component';
import { Observable, exhaustMap, map, of, switchMap } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from 'src/app/users/types/userTypes';
import { errorSelector, selectUrl } from 'src/app/users/store/users.selectors';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  error$!: string|null
  constructor(
    private snackbar: MatSnackBar,
    private store: Store<AppStateInterface>
  ) {
    this.store.select(errorSelector).subscribe({
      next:msg=>{
        this.message(msg)
      }
    })
    this.store.pipe()
  }
  message(msg:Message|null, ...bg:string[]){
    this.snackbar.openFromComponent(MessageComponent,{
      data:msg,
      duration: 6000,
      panelClass: [...bg],

    })
  }
}
