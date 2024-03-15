import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { MessageService } from '../../../shared/services/message.service';
import { UserEntityService } from '../../../shared/services/user-entity.service';
import { GroupedEstates } from '../../mainAdmin/main-admin-home/main-admin-home.component';
import { HouseInterface, UserTypeInterface } from '../../types/userTypes';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy {
  landlord?: UserTypeInterface;
  estates!: GroupedEstates[];
  subscription!: Subscription;
  constructor(
    private activatedRoute: ActivatedRoute,
    private userEntityService: UserEntityService,
    private msg: MessageService
  ) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = combineLatest([this.activatedRoute.params, this.userEntityService.entities$]).subscribe({
      next: ([params, users]) => {
        this.landlord = users.find(u => u._id === params['id']) as UserTypeInterface;
        this.estates = this.landlord?.estates!.reduce((acc: GroupedEstates[], obj: HouseInterface) => {
          let houseType = obj.type.toLowerCase();
          let groupedEstates: GroupedEstates = { name: houseType, value: 0 }
          if (!acc.includes(acc[acc.findIndex(u => u.name == obj.type.toLowerCase())])) {
            groupedEstates.value += 1;
            return [...acc, groupedEstates]
          }
          const found = acc.find(u => u.name == obj.type.toLowerCase());
          if (found) {
            found.value += 1;
            acc.splice(acc.findIndex(u => u.name == found.name), 1, found);
            return [...acc];
          }
          return acc
        }, [] as GroupedEstates[]);
      },
      error: (err) => {
        this.msg.message({ title: 'Incorrect Credentials', text: err.message, color: 'red' });
      }
    })
  }
}
