import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../auth/services/storage.service';
import { ConfirmComponent } from '../../../shared/confirm/confirm.component';
import { UserEntityService } from '../../../shared/services/user-entity.service';
import { AddPropertiesComponent } from '../../LGA/add-properties/add-properties.component';
import { HouseInterface, UserTypeInterface } from '../../types/userTypes';

@Component({
  selector: 'app-mng-caretakers',
  templateUrl: './mng-caretakers.component.html',
  styleUrls: ['./mng-caretakers.component.css']
})
export class MngCaretakersComponent implements OnDestroy {
  landlord?: UserTypeInterface;
  estates?: HouseInterface[];
  subscription!: Subscription;
  constructor(
    private userEntityService: UserEntityService,
    private storageService: StorageService,
    private dialog: MatDialog
  ) {
    this.subscription = this.userEntityService.entities$.subscribe({
      next: users => {
        this.landlord = users.find(u => u._id === this.storageService.getId()) as UserTypeInterface;
        this.estates = this.landlord?.estates as [];
        this.estates = this.estates?.map(h => {
          const house = { ...h };
          house.caretakers = house.caretakers?.map(id => users.find(u => u._id === id) as UserTypeInterface);
          return house;
        });
        console.log(this.estates);
      }
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  editCaretaker(estate: HouseInterface, id: string) {
    this.dialog.open(AddPropertiesComponent, {
      data: { user: this.landlord, estate, action: 'edit' }
    });
  }

  deleteCaretaker(caretakerName: string, estate: HouseInterface, id: string) {
    this.dialog.open(ConfirmComponent, {
      data: { name: caretakerName, caretakerId: id, context: 'Caretaker', estate, action: 'delete' }
    });
  }
}
