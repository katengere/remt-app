import { Injectable} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Message } from 'src/app/users/types/message';
import { MessageComponent } from '../message/message.component';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(
    private snackbar: MatSnackBar,
  ) {}
  message(msg:Message|null){
    if (msg?.title !== undefined || msg?.text!==undefined) {
     return this.snackbar.openFromComponent(MessageComponent,{
        data:msg,
        duration: 4000
      });
    }
    return null;
  }
}
