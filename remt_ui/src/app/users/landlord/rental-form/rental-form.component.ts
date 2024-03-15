import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { HouseEntityService } from '../../../shared/services/house-entity.service';
import { MessageService } from '../../../shared/services/message.service';
import { UserEntityService } from '../../../shared/services/user-entity.service';
import { HouseInterface } from '../../types/userTypes';

@Component({
  selector: 'app-rental-form',
  templateUrl: './rental-form.component.html',
  styleUrls: ['./rental-form.component.css']
})
export class RentalFormComponent {
  rentForm: FormGroup;
  estate: HouseInterface;
  action: string;
  constructor(
    private houseEntityService: HouseEntityService,
    private userEntityService: UserEntityService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private msgService: MessageService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {
    this.estate = { ...dialogData.estate };
    this.action = dialogData.action;

    this.rentForm = this.fb.group({
      from: [new Date(), Validators.required],
      to: [new Date(), Validators.required],
      rent: ['', [Validators.required, Validators.min(10000)]],
      phoneNumber: ['', Validators.required],
      rooms: ['', Validators.required],
      house: [''],
      client: [''],
      action: [dialogData.action],
      _id: [this.estate._id]
    });

    if (dialogData.estate && dialogData.history) {
      this.rentForm.patchValue(dialogData.history);
      this.rentForm.get('_id')?.setValue(dialogData.estate._id);
      this.rentForm.get('house')?.setValue(dialogData.estate);
    }
    console.log('rental-form patched from dialog-data ', this.rentForm.value);
  }
  approveTenant() {
    console.log(this.rentForm.value);
    if (this.rentForm.valid) {
      return this.houseEntityService.update(this.rentForm.value).subscribe({
        next: house => {
          console.log(house);
          this.userEntityService.getAll();
          this.dialog.closeAll();
        },
        error: err => {
          console.log(err);
          this.msgService.message({
            text: err.message,
            title: 'Tenant Register Failure',
            color: 'red',
          }, 7000);
        }
      });
    }
    return this.msgService.message({
      text: 'Please fill the required form fields before submit',
      title: 'Tenant Register Failure',
      color: 'red',
    }, 7000);
  }
  editTenant() {
    console.log(this.rentForm.value);
    if (!this.rentForm.valid) return this.msgService.message({
      text: 'Please fill the required form fields before submit',
      title: 'Tenant Register Failure',
      color: 'red',
    }, 7000);

    return this.houseEntityService.update(this.rentForm.value).subscribe({
      next: house => {
        console.log(house);
        this.userEntityService.getAll();
        this.dialog.closeAll();
      },
      error: err => {
        console.log(err);
        this.msgService.message({
          text: err.message,
          title: 'Tenant Register Failure',
          color: 'red',
        }, 7000);
      }
    });
  }


}
