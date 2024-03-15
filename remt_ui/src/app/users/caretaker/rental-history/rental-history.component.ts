import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../auth/services/storage.service';
import { UserEntityService } from '../../../shared/services/user-entity.service';
import { HouseInterface, RentalHistory } from '../../types/userTypes';

@Component({
  selector: 'app-rental-history',
  templateUrl: './rental-history.component.html',
  styleUrls: ['./rental-history.component.css']
})
export class RentalHistoryComponent implements OnDestroy {
  subscription!: Subscription;
  estates: HouseInterface[] = [];
  tenants: RentalHistory[] = [];

  constructor(
    private userEntityService: UserEntityService,
    private storageService: StorageService,
    private dialog: MatDialog
  ) {
    this.subscription = this.userEntityService.entities$.subscribe({
      next: users => {
        this.estates = users.filter(u => u.userTypeName === 'landlord').map(u => u.estates)
          .reduce((pv, cv) => pv.concat(cv), []) as HouseInterface[];
        this.estates = this.estates.filter(e => e.caretakers?.find(id => id === storageService.getId()));
        let rental_history = this.estates?.filter(e => e.rental_history!.length > 0).map(e => {
          const house = e.rental_history?.map(h => ({ ...h, house: e }));
          return house
        }) as unknown as RentalHistory[];
        rental_history = rental_history?.reduce((accumulator, currentValue) => accumulator?.concat(currentValue), [] as RentalHistory[]);
        this.tenants = rental_history?.sort((a, b) => new Date(b.to).getTime() - new Date(a.to).getTime())?.map(rental => {
          const tenant = users.find(u => u._id == rental.client);
          const tenantRentHistory = { ...rental };
          tenantRentHistory.client = tenant;
          return tenantRentHistory;
        });
      }
    });
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy from tenantRentHistory');
    this.subscription.unsubscribe();
  }

}
