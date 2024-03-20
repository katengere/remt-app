import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { RegisterComponent } from '../../../auth/register/register.component';
import { ConfirmComponent } from '../../../shared/confirm/confirm.component';
import { MessageService } from '../../../shared/services/message.service';
import { UserEntityService } from '../../../shared/services/user-entity.service';
import { UserTypeInterface } from '../../types/userTypes';
import { AddPropertiesComponent } from '../add-properties/add-properties.component';

@Component({
  selector: 'app-lga-index',
  templateUrl: './lga-index.component.html',
  styleUrls: ['./lga-index.component.css']
})
export class LgaIndexComponent {
  lga?: UserTypeInterface;
  paramId = '';
  constructor(
    private userEntityService: UserEntityService,
    private activeRoute: ActivatedRoute,
    private route: Router,
    private dialog: MatDialog,
    private msgService: MessageService
  ) {
    combineLatest([this.activeRoute.params, this.userEntityService.entities$]).subscribe({
      next: ([params, users]) => {
        this.paramId = params['id'];
        this.lga = users.find(u => u._id === params['id']) as UserTypeInterface;
      },
      error: (err) => {
        this.msgService.message({
          title: 'Error',
          text: 'Sorry, something went wrong: ' + err.message,
          color: 'red',
        });
      }
    });
  }

  editUser(user: any) {
    console.log(user);

    this.dialog.open(RegisterComponent, { data: { user, action: 'Edit' } });
  }

  deleteUser(user: UserTypeInterface) {
    this.dialog.open(ConfirmComponent, {
      data: {
        name: user.userInfos.name,
        context: 'User',
        action: 'Delete',
        data: user
      }
    });
  }

  addHouse(user: UserTypeInterface) {
    this.dialog.open(AddPropertiesComponent, {
      data: {
        user,
        context: 'Add House',
        action: 'add',
        estate: {}
      }
    });
  }

  ngOnInit(): void {
  }
}
