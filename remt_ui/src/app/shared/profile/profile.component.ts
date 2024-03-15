import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from '../../auth/services/storage.service';
import { InvoiceInterface, UserTypeInterface } from '../../users/types/userTypes';
import { UserEntityService } from '../services/user-entity.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnDestroy {
  user?: UserTypeInterface;
  invoices?: InvoiceInterface[] = [];
  subscription!: Subscription;
  constructor(
    private userEntityService: UserEntityService,
    private storageService: StorageService,
  ) {
    this.subscription = this.userEntityService.entities$.pipe().subscribe({
      next: users => {
        this.user = users.find(u => u._id === this.storageService.getId()) as UserTypeInterface;

        if (this.user?.userTypeName == 'landlord') {
          this.invoices = this.user?.invoices as InvoiceInterface[];
        } else {
          this.invoices = this.user?.invoices?.filter(inv => inv.tenantId === this.user?._id) as InvoiceInterface[];
        }

        this.invoices = this.invoices?.reduce((accumulator, currentValue) => {
          if (!accumulator.includes(accumulator[accumulator.findIndex(acc => acc.invoiceId == currentValue.invoiceId)])) {
            return [...accumulator, currentValue];
          }
          return accumulator;
        }, [] as InvoiceInterface[]);
      }
    });
  }
  ngOnDestroy(): void {
    console.log('ngOnDestroy');

    this.subscription.unsubscribe();
  }
}
