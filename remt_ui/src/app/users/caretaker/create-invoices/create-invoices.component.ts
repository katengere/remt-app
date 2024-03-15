import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { StorageService } from '../../../auth/services/storage.service';
import { UserEntityService } from '../../../shared/services/user-entity.service';
import { InvoicesComponent } from '../../landlord/invoices/invoices.component';
import { HouseInterface, InvoiceInterface, RentalHistory, UserTypeInterface } from '../../types/userTypes';

@Component({
  selector: 'app-create-invoices',
  templateUrl: './create-invoices.component.html',
  styleUrls: ['./create-invoices.component.css']
})
export class CreateInvoicesComponent implements OnInit, OnDestroy {
  estates: HouseInterface[] = [];
  tenants: RentalHistory[] = [];
  caretaker!: UserTypeInterface;
  subscription!: Subscription;

  constructor(
    private userEntityService: UserEntityService,
    private storageService: StorageService,
    private dialog: MatDialog
  ) {
    this.subscription = this.userEntityService.entities$.pipe().subscribe({
      next: users => {
        this.caretaker = users.find(u => u._id === storageService.getId()) as UserTypeInterface;
        this.estates = users.filter(u => u.userTypeName === 'landlord').map(u => u.estates)
          .reduce((pv, cv) => pv.concat(cv), []) as HouseInterface[];
        this.estates = this.estates.filter(e => e.caretakers?.find(id => id === this.storageService.getId()));

        let rental_history = this.estates?.filter(e => e.rental_history!.length > 0).map(e => {
          const house = e.rental_history?.map(h => ({ ...h, house: e }));
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
  ngOnInit(): void {

  }
  ngOnDestroy(): void {
    console.log('ngOnDestroy from CreateInvoicesComponent');
    this.subscription.unsubscribe();
  }
  invoiceFormDialog() {
    this.dialog.open(InvoicesComponent, {
      data: {
        action: 'create invoice'
      }
    })
  }
  editInvoice(invoice: InvoiceInterface) {
    console.log('edit invoice called ', invoice);

  }
  deleteInvoice(invoice: InvoiceInterface) {
    console.log('delete invoice called ', invoice);
  }
}
