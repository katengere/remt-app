import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from '../../../auth/services/storage.service';
import { UserEntityService } from '../../../shared/services/user-entity.service';
import { RentalHistory, UserTypeInterface } from '../../types/userTypes';

@Component({
  selector: 'app-rental-history',
  templateUrl: './rental-history.component.html',
  styleUrls: ['./rental-history.component.css']
})
export class RentalHistoryComponent {
  landlord?: UserTypeInterface;
  estates?: any;
  rental_history_Records: any;
  title?: string;
  constructor(
    private userEntityService: UserEntityService,
    private storageService: StorageService,
    private dialog: MatDialog
  ) {
    this.userEntityService.entities$.subscribe({
      next: users => {
        this.landlord = users.find(u => u._id === this.storageService.getId()) as UserTypeInterface;
        console.log(this.landlord);

        this.estates = this.landlord?.estates as [];
        let rental_history = this.estates?.filter((e: any) => e.rental_history!.length > 0)
          .map((e: any) => e.rental_history) as unknown as RentalHistory[];
        rental_history = rental_history?.reduce((accumulator, currentValue) => accumulator?.
          concat(currentValue), [] as RentalHistory[]);
        this.rental_history_Records = rental_history?.sort((a, b) => new Date(b.to).getTime() - new Date(a.to).getTime())
          .map(rental => {
            const tenant = users.find(u => u._id == rental.client);
            const tenantRentHistory = { ...rental }
            tenantRentHistory.client = tenant;
            return tenantRentHistory;
          });
      }
    });
  }
}
