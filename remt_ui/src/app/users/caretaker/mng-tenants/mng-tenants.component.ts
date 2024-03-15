import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../auth/services/storage.service';
import { UserEntityService } from '../../../shared/services/user-entity.service';
import { RentalFormComponent } from '../../landlord/rental-form/rental-form.component';
import { HouseInterface, RentalHistory } from '../../types/userTypes';

@Component({
  selector: 'app-mng-tenants',
  templateUrl: './mng-tenants.component.html',
  styleUrls: ['./mng-tenants.component.css']
})
export class MngTenantsComponent implements OnDestroy {
  estates: HouseInterface[] = [];
  tenants: RentalHistory[] = [];
  subscription!: Subscription;

  constructor(
    private userEntityService: UserEntityService,
    private storageService: StorageService,
    private dialog: MatDialog
  ) {
    this.subscription = this.userEntityService.entities$.subscribe({
      next: users => {
        this.estates = users.filter(u => u.userTypeName === 'landlord').map(u => u.estates)
          .reduce((pv, cv) => pv.concat(cv), []) as HouseInterface[];
        this.estates = this.estates.filter(e => e.caretakers?.find(id => id === this.storageService.getId()));
        let rental_history = this.estates?.filter(e => e.rental_history!.length > 0).map(e => {
          const house = e.rental_history?.filter(h => new Date(h.to).getTime() > Date.now())?.map(h => ({ ...h, house: e }));
          return house
        }) as unknown as RentalHistory[];
        rental_history = rental_history?.reduce((accumulator, currentValue) => accumulator?.concat(currentValue), [] as RentalHistory[]);
        this.tenants = rental_history?.map(rental => {
          const tenant = users.find(u => u._id == rental.client);
          const tenantRentHistory = { ...rental };
          tenantRentHistory.client = tenant;
          return tenantRentHistory;
        });
      }
    });
  }
  ngOnDestroy(): void {
    console.log('ngOnDestroy from MngTenantsComponent');
    this.subscription.unsubscribe();
  }
  editTenant(history: any, action?: string) {
    this.dialog.open(RentalFormComponent, {
      data: { history, estate: history.house, action }
    })
  }
}
