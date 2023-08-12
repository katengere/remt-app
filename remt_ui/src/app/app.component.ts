import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as userActions from "./users/store/users.actions";
import { AppStateInterface } from './users/types/userTypes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store<AppStateInterface>
  ){}
  ngOnInit(){
    this.store.dispatch(userActions.getUser());
  }
}
