import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, takeWhile } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage.service';
import { selectUrl } from 'src/app/users/store/users.selectors';
import { UserEntityService } from '../services/user-entity.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  isAlive: boolean = true;
  isSidenavExpand = false;
  isLessThenLargeDevice = true;
  permisions!: string[];
  id!: string;
  userType!: string;
  activeDashboard!: boolean;
  route!: string;
  @Output() sideNav = new EventEmitter();
  isLoading$!: Observable<boolean>;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store,
    private UserEntityService: UserEntityService,
    private storageService: StorageService
  ) {
    this.breakpointObserver.observe(['(max-width: 1199px)']).pipe(takeWhile(() => this.isAlive)).subscribe(({ matches }) => {
      this.isLessThenLargeDevice = matches;
      if (!matches) {
        this.isSidenavExpand = false;
      }
    });
    combineLatest([this.store.select(selectUrl), this.UserEntityService.entities$]).subscribe({
      next: ([url, users]) => {
        this.route = url.slice(1);
        this.activeDashboard = url === '/' + this.storageService.getUserTypeName() + '/' + this.storageService.getId();

        this.userType = this.storageService.getUserTypeName()?.toLowerCase();
        this.id = storageService.getId();
        this.permisions = users.filter(u => u.userTypeName.toLowerCase() == this.route.toLowerCase() ||
          u.userTypeName.toLowerCase() == this.userType)
          .reduce((acc, { permissions }) => [...acc, ...permissions], [] as string[])
          .filter((p, i, arr) => arr.indexOf(p) == i);
      }
    });
  }
  toggleSideNav() {
    this.sideNav.emit();
  }
  ngOnInit(): void { }
}
