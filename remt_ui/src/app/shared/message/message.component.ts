import { Component, Inject, Input } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Message } from 'src/app/users/types/message';

@Component({
  selector: 'weado-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {

constructor(
  @Inject(MAT_SNACK_BAR_DATA) public data: Message
){}
}
