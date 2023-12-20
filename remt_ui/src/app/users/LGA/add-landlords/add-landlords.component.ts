import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MessageService } from 'src/app/shared/services/message.service';
import { UserDataService } from 'src/app/shared/services/user-data.service';
import { UserEntityService } from 'src/app/shared/services/user-entity.service';
import { selectUrl } from 'src/app/users/store/users.selectors';
import {
  AppStateInterface,
  UserTypeInterface,
} from 'src/app/users/types/userTypes';
import { UUID, formatUrl } from '../../types/usefulFunctions';

@Component({
  selector: 'app-add-landlords',
  templateUrl: './add-landlords.component.html',
  styleUrls: ['./add-landlords.component.css'],
})
export class AddLandlordsComponent {
  newLandlord: UserTypeInterface = {
    id: UUID(),
    userTypeName: '',
    permissions: [],
    ui: {},
    userInfos: {
      name: '',
      age: null,
      nationId: null,
      phoneNumber: '',
    },
    estates: [],
    createdAt: new Date()
  };
  userInfosForm!: FormGroup;
  action!: string;
  url!: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private msgService: MessageService,
    private store: Store<AppStateInterface>,
    private userEntityService: UserEntityService,
    private userDataService: UserDataService
  ) {
    this.userInfosForm = this.formBuilder.group({
      name: ['', Validators.required],
      id: [''],
      userTypeName: ['landlord', Validators.required],
      age: [null, Validators.required],
      nationId: [null, Validators.required],
      phoneNumber: ['', Validators.required],
    });
    this.store.select(selectUrl).subscribe({
      next: (url) => {        
        this.url = formatUrl(url);
      },
    });
  }

  addLandlord() {
    if (!this.userInfosForm.valid) {
      return this.msgService.message({
        text: 'Please make sure to fill all required fields!',
        title: 'Form Error',
        color: 'red',
      });
    }
    const {name, userTypeName, age, nationId, phoneNumber} = this.userInfosForm.value;
    this.newLandlord.userTypeName = userTypeName;
    this.newLandlord.userInfos = {name, age, nationId, phoneNumber};
    console.log('add landlord ', this.newLandlord);
    return this.userDataService.add(this.newLandlord).subscribe({
      next: (user) => {
        this.userEntityService.getAll();
        this.router.navigateByUrl(this.url);
        this.msgService.message({
          title: 'Register Success',
          text: 'Successfully registered ' + user.userInfos.name.toUpperCase(),
          color: 'green',
        });
      },
      error: (err) => {
        console.log(err);
        this.msgService.message({
          title: 'Register Error',
          text:
            err.statusText == 'Unknown Error'
              ? 'No internet connection'
              : typeof err.error == 'string'
              ? err.error
              : err.message,
          color: 'red',
        });
      },
    });
  }
}

 // onEdit() {
  //   if (this.userInfosForm.valid) {
  //     const { name, nationId, phoneNumber, age, userTypeName, id } =
  //       this.userInfosForm.value;
  //     this.newLandlord.userInfos = { name, phoneNumber, nationId, age };
  //     this.newLandlord.userTypeName = userTypeName;
  //     this.newLandlord.id = id;
  //     this.userEntityService.update(this.newLandlord).subscribe({
  //       next: (user) => {
  //         this.userEntityService.getAll();
  //         window.location.reload();
  //         this.msgService.message({
  //           text: 'Successfully edited ' + user.userInfos.name,
  //           title: 'Edit Success',
  //           color: 'green',
  //         });
  //       },
  //       error: (err) => {
  //         this.msgService.message({
  //           text: 'Sorry something went wrong ' + err.message,
  //           title: 'Edit Failure',
  //           color: 'red',
  //         });
  //       },
  //     });
  //   } else {
  //     this.msgService.message({
  //       text: 'Please make sure to fill the form correctly before submit',
  //       title: 'Edit Failure',
  //       color: 'red',
  //     });
  //   }
  // }