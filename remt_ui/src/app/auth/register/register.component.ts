import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MessageService } from 'src/app/shared/services/message.service';
import { UserEntityService } from 'src/app/shared/services/user-entity.service';
import {
  AppStateInterface,
  UserTypeInterface,
} from 'src/app/users/types/userTypes';
import { HistoryService } from '../../shared/services/history.service';
import { DOBValidator } from '../../shared/validators/DOB-Validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  remtUser: UserTypeInterface = {
    _id: '',
    userTypeName: '',
    permissions: [],
    userInfos: {
      name: '', age: null, nation_Id: null, phoneNumber: '', password: '', gender: '', summary: ''
    },
    estates: [],
    createdAt: new Date()
  };
  userInfosForm!: FormGroup;
  action!: string;
  userTypeNames: string[] = ['lga', 'landlord', 'admin', 'caretaker', 'broker', 'tenant', 'lender'];
  url!: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private msgService: MessageService,
    private store: Store<AppStateInterface>,
    private userEntityService: UserEntityService,
    private dialog: MatDialog,
    private historyService: HistoryService,
    @Inject(MAT_DIALOG_DATA) private dialogData: any
  ) {
    this.userInfosForm = this.formBuilder.group({
      name: ['', Validators.required],
      _id: [''],
      userTypeName: ['', Validators.required],
      age: [Date, [Validators.required, DOBValidator]],
      nation_Id: [null, Validators.required],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required],
      gender: ['', Validators.required],
      summary: ['']
    });
    this.action = dialogData.action;
    this.remtUser.action = dialogData.action;

    if (dialogData?.user._id != undefined) {
      this.userEntityService.entities$.subscribe({
        next: (users) => {
          const user = users.find(u => u._id === dialogData.user._id) as UserTypeInterface;
          this.userInfosForm.patchValue(
            Object.assign({}, user.userInfos, {
              _id: user._id,
              userTypeName: user.userTypeName,
              password: '1234'
            })
          );
        },
      });
    }
  }

  onEdit() {
    if (this.userInfosForm.valid) {
      const { name, nation_Id, phoneNumber, password, age, userTypeName, gender, summary } =
        this.userInfosForm.value;
      console.log('action path ', this.userInfosForm.value);

      this.remtUser.userInfos = { name, phoneNumber, gender, summary, password, nation_Id, age };
      this.remtUser.userTypeName = userTypeName;
      this.remtUser._id = this.dialogData.user._id;
      this.remtUser.permissions = this.dialogData.user.permissions;
      this.remtUser.estates = this.dialogData.user.estates;
      this.remtUser.regUserIds = this.dialogData.user.regUserIds;
      this.remtUser.regEstateIds = this.dialogData.user.regEstateIds;
      this.remtUser.createdAt = this.dialogData.user.createdAt;

      this.userEntityService.update(this.remtUser).subscribe({
        next: (user) => {
          this.dialog.closeAll();
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
    console.log(this.userInfosForm.value);

    const { name, userTypeName, password, gender, summary, age, nation_Id, phoneNumber } = this.userInfosForm.value;
    this.remtUser.userTypeName = userTypeName;
    this.remtUser.userInfos = { name, age, password, gender, summary, nation_Id, phoneNumber };
    return this.userEntityService.add(this.remtUser).subscribe({
      next: (user) => {
        this.dialog.closeAll();
        this.userEntityService.getAll();
        console.log('navigating to ', this.historyService.url);

        this.router.navigateByUrl(this.historyService.url);
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
