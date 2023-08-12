import { Component, OnInit } from '@angular/core';
import { PersonInfoInterface } from 'src/app/users/types/userTypes';
import { PersonInfoService } from '../services/person-info.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  remtUser: PersonInfoInterface = {
    name: '', id: '', age: 0, nationId: 0,
    phoneNumber: 0
  }
  constructor(
    private personInfoService: PersonInfoService,
    private msgService: MessageService,
    ) { }

  ngOnInit(): void {
  }
  onRegister(){
    const {name, nationId, phoneNumber} = this.remtUser;
    if (!name  || !nationId) {
       return this.msgService.message({
         title:'ERROR', text:'tafadhali hakikisha umejaza fomu kwa usahihi'
        }, 'bg-danger');
    }
    return this.personInfoService.register(this.remtUser)
    .subscribe({
      next: (res)=>{
       this.msgService.message({
         title:'SUCCESS', text:'umefanikiwa kujisajili SAgPA'
        }, 'bg-success') ;
        console.log(res);
    },
    error:(error)=>{
      console.log(error);
      return this.msgService.message({
        title:'ERROR', text:error.error
       }, 'bg-success');
    }});
  }
}
