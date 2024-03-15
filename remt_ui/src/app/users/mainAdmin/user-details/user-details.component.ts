import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { exhaustMap } from 'rxjs';
import { RegisterComponent } from 'src/app/auth/register/register.component';
import { ConfirmComponent } from 'src/app/shared/confirm/confirm.component';
import { MessageService } from 'src/app/shared/services/message.service';
import { UserDataService } from '../../../shared/services/user-data.service';
import { UserEntityService } from '../../../shared/services/user-entity.service';
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
  disabled: boolean = false;
  constructor(
    private userDataService: UserDataService,
    private userEntityService: UserEntityService,
    private activeRoute: ActivatedRoute,
    private route: Router,
    private dialog: MatDialog,
    private msg: MessageService
  ) { }
  ngOnInit() {
    this.activeRoute.params.pipe(exhaustMap((param: Params) => this.userEntityService.getByKey(param['id']))).subscribe({
      next: (user) => {
        this.selectedUser = user;
        console.log(user);

        this.disabled = this.selectedUser.userTypeName.toLocaleLowerCase() == 'admin' ||
          this.selectedUser.userTypeName.toLocaleLowerCase() == 'lga';
      },
      error: (err) => {
        this.msg.message({ title: 'Incorrect Credentials', text: err.message, color: 'red' });
      }
    });
  }

  editUser() {
    this.dialog.open(RegisterComponent, { data: { user: this.selectedUser, action: 'Edit User' } }).afterClosed().subscribe({
      next: value => {
        console.log(value);
        this.ngOnInit();
      },
      error: e => console.log(e)
    });
  }

  deleteUser() {
    this.dialog.open(ConfirmComponent, {
      data: {
        name: this.selectedUser?.userInfos.name,
        context: 'User',
        action: 'Delete',
        data: this.selectedUser
      }
    });
  }
}
