import { Component, OnInit, Inject } from '@angular/core';
import { UserEntityService } from './shared/services/user-entity.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private userEntityService: UserEntityService
  ){}
  ngOnInit(){
    this.userEntityService.getAll();
  }
}
