import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { UserEntityService } from '../../../shared/services/user-entity.service';
import { UserTypeInterface } from '../../types/userTypes';

@Component({
  selector: 'app-lga-home',
  templateUrl: './lga-home.component.html',
  styleUrls: ['./lga-home.component.css']
})
export class LgaHomeComponent implements OnInit {
  lga?: UserTypeInterface;
  constructor(
    private userEntityService: UserEntityService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    combineLatest([this.route.params, this.userEntityService.entities$]).subscribe({
      next:([params, users])=>{
        const id = params['id'];
        this.lga = users.find(u=>u.id===id) as UserTypeInterface;
      },
      error:(err)=>{

      }
    });
  }
  ngOnInit(): void {
  }

}
