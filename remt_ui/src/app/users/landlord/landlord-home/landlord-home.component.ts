import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { MessageService } from 'src/app/shared/services/message.service';
import { UserEntityService } from 'src/app/shared/services/user-entity.service';
import { AddPropertiesComponent } from '../../LGA/add-properties/add-properties.component';
import { GroupedEstates } from '../../mainAdmin/main-admin-home/main-admin-home.component';
import { HouseInterface, UserTypeInterface } from '../../types/userTypes';

@Component({
  selector: 'app-landlord-home',
  templateUrl: './landlord-home.component.html',
  styleUrls: ['./landlord-home.component.css']
})
export class LandlordHomeComponent implements OnInit, OnDestroy {
  landlord?: UserTypeInterface;
  estates!: GroupedEstates[];
  subscription!: Subscription
  constructor(
    private activatedRoute: ActivatedRoute,
    private userEntityService: UserEntityService,
    private matDialog: MatDialog,
    private msg: MessageService
  ) { }

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
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  AddPropertyDialog() {
    this.matDialog.open(AddPropertiesComponent, {
      data: { user: this.landlord, action: 'add', estate: { caretakers: [] } }
    })
  }

}
