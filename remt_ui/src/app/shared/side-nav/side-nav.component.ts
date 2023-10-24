import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest, takeWhile} from 'rxjs';
import { UserEntityService } from '../services/user-entity.service';
import { selectUrl } from 'src/app/users/store/users.selectors';

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
  route!: string;
  isLoading$!: Observable<boolean>;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store,
    private userEntityService: UserEntityService,
  ){
    this.breakpointObserver.observe(['(max-width: 1199px)']).pipe(takeWhile(() => this.isAlive)).subscribe(({matches}) => {
      this.isLessThenLargeDevice = matches;
      if (!matches) {
        this.isSidenavExpand = false;
      }
    });
    combineLatest([this.store.select(selectUrl), this.userEntityService.entities$]).subscribe({
      next:([params, users])=>{         
        this.route = params.slice(1);
        this.permisions = users.filter(u=>u.userTypeName.toLowerCase()==this.route.toLowerCase())
        .reduce((acc,{permissions})=>[...acc, ...permissions],[] as string[])
        .filter((p,i,arr)=>arr.indexOf(p)==i);  
      }
    });
    
    this.isLoading$ = userEntityService.loading$;
  }

  ngOnInit(): void {}
}
