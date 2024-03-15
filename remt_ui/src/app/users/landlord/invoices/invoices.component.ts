import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { MessageService } from 'src/app/shared/services/message.service';
import { StorageService } from '../../../auth/services/storage.service';
import { UserEntityService } from '../../../shared/services/user-entity.service';
import { HouseInterface, RentalHistory } from '../../types/userTypes';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit, OnDestroy {
  invoice: any
  invoiceForm!: FormGroup;
  estates: HouseInterface[] = [];
  tenants: RentalHistory[] = [];
  readOnly: boolean = false;
  timeOutId: any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private msg: MessageService, private userEntityService: UserEntityService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private storageService: StorageService,
  ) {
    this.invoiceForm = this.formBuilder.group({
      _id: [storageService.getId()], invoiceId: ['', Validators.required],
      invoiceName: ['', Validators.required], tenantId: ['', Validators.required],
      tenantName: ['', Validators.required], tenantPhoneNumber: ['', Validators.required],
      tax: [7], netTotal: [0, Validators.required], houseId: ['', Validators.required],
      houseType: ['', Validators.required], start: ['', Validators.required], end: ['', Validators.required],
      rooms: [0, Validators.required], rent: [0, Validators.required], createdAt: [new Date()],
      rentTotal: [0, Validators.required], action: [dialogData.action]
    });
    combineLatest([
      this.invoiceForm.get('rooms')?.valueChanges as Observable<number>,
      this.invoiceForm.get('rent')?.valueChanges as Observable<number>,
      this.invoiceForm.get('start')?.valueChanges as Observable<string>,
      this.invoiceForm.get('end')?.valueChanges as Observable<string>
    ]).subscribe({
      next: ([rooms, rent, start, end]) => {
        console.log(rooms, rent);
        this.invoiceForm?.get('rentTotal')?.setValue(rooms * this.getMonthDiff(start, end, rent));
        const netTotal = (this.invoiceForm?.get('tax')?.value / 100) * this.invoiceForm?.get('rentTotal')?.value + this.invoiceForm?.get('rentTotal')?.value;
        this.invoiceForm?.get('netTotal')?.setValue(netTotal);
      }
    });
  }
  ngOnDestroy(): void {
    clearTimeout(this.timeOutId);
  }
  readonlyHint() {
    this.readOnly = true;
    return this.timeOutId = setTimeout(() => this.readOnly = false, 4000)
  }
  getMonthDiff(start: string, end: string, rent: number): number {
    const st = new Date(start), en = new Date(end);
    const diff = en.getTime() - st.getTime();
    const rentPerDay = rent / 30;
    const days = diff / 86400000;
    console.log('days ', days);

    return days * rentPerDay;
  }

  ngOnInit(): void {
    this.userEntityService.entities$.pipe().subscribe({
      next: users => {
        const userType = users.find(u => u._id === this.storageService.getId());
        console.log(userType);

        this.estates = users.filter(u => u.userTypeName === 'landlord').map(u => u.estates)
          .reduce((pv, cv) => pv.concat(cv), []) as HouseInterface[];
        if (userType?.userTypeName == 'caretaker') {
          this.estates = this.estates.filter(e => e.caretakers?.find(id => id === this.storageService.getId()));
        } else if (userType?.userTypeName == 'landlord') {
          this.estates = this.estates.filter(e => e.owner_Id === this.storageService.getId());
        }
        console.log('caretakers mng estates ', this.estates);

        let rental_history = this.estates?.filter(e => e.rental_history!.length > 0).map(e => {
          const house = e.rental_history?.map(h => ({ ...h, rent: h.rent, rooms: h.rooms, house: e }));
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
  saveInvoice() {
    if (this.invoiceForm.valid) {
      console.log(this.invoiceForm.value);
      this.userEntityService.update(this.invoiceForm.value).subscribe({
        next: (value) => {
          this.msg.message({
            title: 'Form Submit Success',
            text: 'successfully submited',
            color: 'green'
          });
          this.userEntityService.getAll();
          this.dialog.closeAll();
          console.log(value);
        },
        error: (err) => {
          console.log(err);
          this.msg.message({
            text: err.message,
            title: 'Property Register Failure',
            color: 'red',
          });
        }
      });
    } else {
      this.msg.message({
        title: 'Invalid Form',
        text: 'Please fill the required fields before submit',
        color: 'red'
      });
    }
  }
  userChange(index: number, tenant: RentalHistory) {
    this.invoiceForm.get('tenantName')?.setValue(tenant.client.userInfos.name);
    this.invoiceForm.get('tenantId')?.setValue(tenant.client._id);
    this.invoiceForm?.get('houseId')?.setValue(tenant.house._id);
    const id = this.invoiceForm.get('tenantName')?.value.split(' ')[0] + '_' + Date.now();
    this.invoiceForm.get('invoiceId')?.setValue(id);
    this.invoiceForm.get('tenantPhoneNumber')?.setValue(tenant.client.userInfos.phoneNumber);
    this.invoiceForm?.get('houseType')?.setValue(tenant.house.type);
    this.invoiceForm?.get('rent')?.setValue(tenant.rent);
    this.invoiceForm?.get('start')?.setValue(tenant.from);
    this.invoiceForm?.get('end')?.setValue(tenant.to);
    this.invoiceForm?.get('rooms')?.setValue(tenant.rooms);
    this.invoiceForm?.get('rentTotal')?.setValue(this.invoiceForm?.get('rooms')?.value * this.invoiceForm?.get('rent')?.value);
    const netTotal = (this.invoiceForm?.get('tax')?.value / 100) * this.invoiceForm?.get('rentTotal')?.value + this.invoiceForm?.get('rentTotal')?.value;
    this.invoiceForm?.get('netTotal')?.setValue(netTotal);
  }
}
