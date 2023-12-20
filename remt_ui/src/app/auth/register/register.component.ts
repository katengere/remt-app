import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
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
import { UUID } from '../../users/types/usefulFunctions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  remtUser: UserTypeInterface = {
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
  userTypeNames: string[] = [
    'lga',
    'landlord',
    'admin',
    'caretaker',
    'broker',
    'tenant',
    'lender',
  ];
  url!: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private msgService: MessageService,
    private store: Store<AppStateInterface>,
    private userEntityService: UserEntityService,
    private userDataService: UserDataService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {
    this.userInfosForm = this.formBuilder.group({
      name: ['', Validators.required],
      id: [''],
      userTypeName: ['', Validators.required],
      age: [null, Validators.required],
      nationId: [null, Validators.required],
      phoneNumber: ['', Validators.required],
    });
    this.store.select(selectUrl).subscribe({
      next: (url) => {        
        const urlSegments = url.split('/');
        if (urlSegments.length>3) {
            urlSegments.pop();
            return this.url = urlSegments.join('/');
        }
        this.url = urlSegments.join('/')+'/manage_users';
        console.log('adjasted url ', this.url);
        return this.url;
      },
    });
    if (dialogData?.user.id != undefined) {
      this.action = dialogData.action;
      this.userEntityService.entities$.subscribe({
        next: (users) => {
          const user = users.find(
            (u) => u.id === dialogData.user.id
          ) as UserTypeInterface;
          this.userInfosForm.setValue(
            Object.assign({}, user.userInfos, {
              id: user.id,
              userTypeName: user.userTypeName,
            })
          );
        },
      });
    }
  }

  onEdit() {
    if (this.userInfosForm.valid) {
      const { name, nationId, phoneNumber, age, userTypeName, id } =
        this.userInfosForm.value;
      this.remtUser.userInfos = { name, phoneNumber, nationId, age };
      this.remtUser.userTypeName = userTypeName;
      this.remtUser.id = id;
      this.remtUser.permissions = this.dialogData.user.permissions;
      this.remtUser.estates = this.dialogData.user.estates;
      this.remtUser.createdAt = this.dialogData.user.createdAt;
      this.remtUser.ui = this.dialogData.user.ui;
      this.userEntityService.update(this.remtUser).subscribe({
        next: (user) => {
          this.dialog.closeAll();
          this.userEntityService.getAll();
          window.location.reload();
          this.msgService.message({
            text: 'Successfully edited ' + user.userInfos.name,
            title: 'Edit Success',
            color: 'green',
          });
        },
        error: (err) => {
          this.msgService.message({
            text: 'Sorry something went wrong ' + err.message,
            title: 'Edit Failure',
            color: 'red',
          });
        },
      });
    } else {
      this.msgService.message({
        text: 'Please make sure to fill the form correctly before submit',
        title: 'Edit Failure',
        color: 'red',
      });
    }
  }

  onRegister() {
    if (!this.userInfosForm.valid) {
      return this.msgService.message({
        text: 'Please make sure to fill all required fields!',
        title: 'Form Error',
        color: 'red',
      });
    }
    const {name, userTypeName, age, nationId, phoneNumber} = this.userInfosForm.value;
    this.remtUser.userTypeName = userTypeName;
    this.remtUser.userInfos = {name, age, nationId, phoneNumber};
    return this.userDataService.add(this.remtUser).subscribe({
      next: (user) => {
        this.dialog.closeAll();
        this.userEntityService.getAll();
        console.log('navigating to ', this.url);
        
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
