import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../auth/services/storage.service';
import { UserEntityService } from '../../../shared/services/user-entity.service';
import { GroupedEstates } from '../../mainAdmin/main-admin-home/main-admin-home.component';
import { HouseInterface, UserTypeInterface } from '../../types/userTypes';

@Component({
  selector: 'app-caretaker-home',
  templateUrl: './caretaker-home.component.html',
  styleUrls: ['./caretaker-home.component.css']
})
export class CaretakerHomeComponent implements OnInit, OnDestroy {
  caretaker?: UserTypeInterface;
  estates: HouseInterface[] = [];
  estatesGroup: GroupedEstates[] = [];
  subscription!: Subscription;

  constructor(
    private userEntityService: UserEntityService,
    private storageService: StorageService,
    private dialog: MatDialog
  ) {
    this.subscription = this.userEntityService.entities$.pipe().subscribe({
      next: users => {
        this.estates = users.filter(u => u.userTypeName === 'landlord').map(u => u.estates)
          .reduce((pv, cv) => pv.concat(cv), []) as HouseInterface[];
        this.estates = this.estates.filter(e => e.caretakers?.find(id => id === storageService.getId()));
        this.estates = this.estates.map(e => {
          const owner = users.find(u => u._id == e.owner_Id);
          return { ...e, owner_Id: owner };
        });
        this.estatesGroup = this.estates!.reduce((acc: GroupedEstates[], obj: HouseInterface) => {
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
      }
    });
  }
  ngOnDestroy(): void {
    console.log('ngOnDestroy from CaretakerHomeComponent');
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
  }

}
