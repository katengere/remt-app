import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from '../../../auth/services/storage.service';
import { UserEntityService } from '../../../shared/services/user-entity.service';
import { AddPropertiesComponent } from '../../LGA/add-properties/add-properties.component';
import { HouseInterface, UserTypeInterface } from '../../types/userTypes';
import { RentalFormComponent } from '../rental-form/rental-form.component';

@Component({
  selector: 'app-mng-properties',
  templateUrl: './mng-properties.component.html',
  styleUrls: ['./mng-properties.component.css']
})
export class MngPropertiesComponent {
  landlord?: UserTypeInterface;
  estates?: HouseInterface[];
  
  constructor(
    private userEntityService: UserEntityService,
    private storageService: StorageService,
    private dialog: MatDialog
  ){
    this.userEntityService.entities$.subscribe({
      next: users=>{
        this.landlord = users.find(u=>u._id===this.storageService.getId()) as UserTypeInterface;
        this.estates = this.landlord?.estates as [];
        this.estates = this.estates?.map(h=>{
          const house = {...h};
          house.caretakers = house.caretakers?.map(id=>users.find(u=>u._id===id) as UserTypeInterface);
          return house;
        });  
        console.log(this.estates);
              
      }
    });
  }
  editHouseDialog(estate?: HouseInterface){
    this.dialog.open(AddPropertiesComponent,{
      data:{user: this.landlord, estate, action:'edit'}
    })
  }
  displayRentForm(estate: HouseInterface){
    this.dialog.open(RentalFormComponent,{
      data:{estate, action:'approve'}
    });
  }  
}
