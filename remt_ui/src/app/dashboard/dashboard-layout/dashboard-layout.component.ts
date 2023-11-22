import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { StorageService } from 'src/app/auth/services/storage.service';

@Component({
  selector: 'll-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {
  isLessThenLargeDevice!: boolean;
  isSidenavExpand = false;
  @ViewChild('sidenav') sidenav: any;
  username!: string | null;
  userType!: string | null;

  constructor(
    private breakpointObserver: BreakpointObserver, private router: Router,
    private storageService: StorageService,
    private dialog: MatDialog,
    ) {
      this.breakpointObserver.observe(['(max-width: 1199px)']).subscribe(({ matches }) => {
        this.isLessThenLargeDevice = matches;
        if (!matches) {
          this.isSidenavExpand = false;
        }
      });
      this.username = this.storageService.getUserName()
      this.userType = this.storageService.getUserTypeName()      
    }

  loginDialog(){
    this.dialog.open(LoginComponent)
  }
  logout(){
    alert('Log out action needed')
  }
  toggleSidenav(): void {
    this.sidenav.toggle();
    this.isSidenavExpand = this.sidenav.opened;
  }
}
