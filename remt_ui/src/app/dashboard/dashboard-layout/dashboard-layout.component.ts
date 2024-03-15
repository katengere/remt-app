import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { StorageService } from 'src/app/auth/services/storage.service';
import { UserDataService } from '../../shared/services/user-data.service';
import { UserEntityService } from '../../shared/services/user-entity.service';
import { logout } from '../../users/store/users.actions';
import { selectUrl } from '../../users/store/users.selectors';

@Component({
  selector: 'll-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {
  isLessThenLargeDevice!: boolean;
  isSidenavExpand = false;
  @ViewChild('sidenav') sidenav: any;
  username!: string | undefined;
  userType!: string | undefined;
  id!: string | null;
  activeDashboard = false;
  showInput = false;

  constructor(
    private breakpointObserver: BreakpointObserver, private router: Router,
    private storageService: StorageService,
    private dialog: MatDialog,
    private store: Store,
    private userDataService: UserDataService,
    private userEntityService: UserEntityService
  ) {
    combineLatest([store.select(selectUrl), this.breakpointObserver.observe(['(max-width: 1199px)'])]).subscribe(([url, { matches }]) => {
      this.isLessThenLargeDevice = matches;
      this.activeDashboard = url === '/dashboard/broker';
      if (!matches) {
        this.isSidenavExpand = false;
      }
    });
    this.username = this.storageService.getUserName();
    this.userType = this.storageService.getUserTypeName();
    this.id = storageService.getId();
  }

  loginDialog() {
    this.showInput = false;
    this.dialog.open(LoginComponent)
  }
  toggleSearchField(): boolean {
    return this.showInput = !this.showInput;
  }
  logout() {
    this.store.dispatch(logout());
    this.userEntityService.getAll();
    this.username = this.storageService.getUserName();
    this.userType = this.storageService.getUserTypeName();
  }
  toggleSidenav(): void {
    this.sidenav.toggle();
    this.showInput = false;
    this.isSidenavExpand = this.sidenav.opened;
  }
  search(value: string): void {
    console.log(value);
    if (value.length == 0) this.toggleSearchField();
    this.userEntityService.setFilter(value);
  }
}
