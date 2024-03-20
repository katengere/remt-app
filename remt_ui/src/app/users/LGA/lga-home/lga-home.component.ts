import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { StorageService } from 'src/app/auth/services/storage.service';
import { MessageService } from '../../../shared/services/message.service';
import { UserEntityService } from '../../../shared/services/user-entity.service';
import { logout } from '../../../users/store/users.actions';
import { selectUrl } from '../../store/users.selectors';
import { UserTypeInterface } from '../../types/userTypes';
import { AddLandlordsComponent } from '../add-landlords/add-landlords.component';
import { AddPropertiesComponent } from '../add-properties/add-properties.component';

@Component({
  selector: 'app-lga-home',
  templateUrl: './lga-home.component.html',
  styleUrls: ['./lga-home.component.css']
})
export class LgaHomeComponent {
  isLessThenLargeDevice!: boolean;
  isSidenavExpand = false;
  @ViewChild('sidenav') sidenav: any;
  lga!: UserTypeInterface;
  username!: string;
  id!: string;
  userType!: string;
  activeDashboard = false;
  activeProfile = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private activatedRoute: ActivatedRoute,
    private msgService: MessageService,
    private storageService: StorageService,
    private dialog: MatDialog,
    private store: Store,
    private userEntityService: UserEntityService
  ) {
    combineLatest([this.breakpointObserver.observe(['(max-width: 1199px)']), this.store.select(selectUrl), this.activatedRoute.params, this.userEntityService.entities$]).subscribe({
      next: ([{ matches }, url, params, users]) => {
        this.isLessThenLargeDevice = matches;
        if (!matches) {
          this.isSidenavExpand = false;
        }
        this.lga = users.find(u => u._id === params['id']) as UserTypeInterface;
        this.username = this.lga?.userInfos.name;
        this.activeDashboard = url === '/' + this.storageService.getUserTypeName() + '/' + this.storageService.getId();
        this.activeProfile = url === '/' + this.storageService.getUserTypeName() + '/' + this.storageService.getId() + '/' + 'profile';
        this.userType = this.lga?.userTypeName;
        this.id = this.lga?._id;
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

  loginDialog() {
    this.dialog.open(LoginComponent)
  }

  logout() {
    this.store.dispatch(logout());
  }

  add_landlords() {
    // this.sidenav.toggle();
    this.isSidenavExpand = this.sidenav.opened;
    this.dialog.open(AddLandlordsComponent)
  }

  add_properties() {
    this.sidenav.toggle();
    this.isSidenavExpand = this.sidenav.opened;
    this.dialog.open(AddPropertiesComponent)
  }

  toggleSidenav(): void {
    this.sidenav.toggle();
    this.isSidenavExpand = this.sidenav.opened;
  }

}
