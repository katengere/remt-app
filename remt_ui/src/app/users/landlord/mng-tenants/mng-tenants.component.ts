import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from '../../../auth/services/storage.service';
import { UserEntityService } from '../../../shared/services/user-entity.service';
import { HouseInterface, RentalHistory, UserTypeInterface } from '../../types/userTypes';
import { RentalFormComponent } from '../rental-form/rental-form.component';

@Component({
  selector: 'app-mng-tenants',
  templateUrl: './mng-tenants.component.html',
  styleUrls: ['./mng-tenants.component.css']
})
export class MngTenantsComponent {
  landlord?: UserTypeInterface;
  tenants: UserTypeInterface[] = [];
  estates?: HouseInterface[];
  title?: string;
  rental_history_Records?: any[] = [];
  rental_history_Current?: any[] = [];
  rental_history_Past?: any[] = [];
  
  constructor(
    private userEntityService: UserEntityService,
    private storageService: StorageService,
    private dialog: MatDialog
  ){
    this.userEntityService.entities$.subscribe({
      next: users=>{
        this.landlord = users.find(u=>u._id===this.storageService.getId()) as UserTypeInterface;
        this.estates = this.landlord?.estates as [];
        let rental_history = this.estates?.filter(e => e.rental_history!.length > 0).map(e => {
          const house = e.rental_history?.map(h=>({...h, house:e}));
          return house
        }) as unknown as RentalHistory[];
        rental_history = rental_history?.reduce((accumulator, currentValue) => accumulator?.concat(currentValue), [] as RentalHistory[]);
        this.rental_history_Current = rental_history?.filter(r=>new Date(r.to).getTime()>Date.now()).map(rental=>{
          const tenant = users.find(u=>u._id==rental.client);
          const tenantRentHistory = {...rental};
          tenantRentHistory.client = tenant;
          return tenantRentHistory;
        });
        this.rental_history_Past = rental_history?.filter(r=>new Date(r.to).getTime()<Date.now()).map(rental=>{
          const tenant = users.find(u=>u._id==rental.client);
          const tenantRentHistory = {...rental};
          tenantRentHistory.client = tenant;
          return tenantRentHistory;
        });
        this.rental_history_Records = this.rental_history_Current;
        console.log('rental_history records ', this.rental_history_Records);
        
        this.title = 'Current Tenants';   
      }
    });   
  }
  toggleTenantsHistory(time: string){
    if (time == 'current') {
        this.title = 'Current Tenants';   
        this.rental_history_Records = this.rental_history_Current;
    } else {
      this.title = 'Past Tenants';
      this.rental_history_Records = this.rental_history_Past;         
    }
  }

  editTenant(history: any, action?:string){
    this.dialog.open(RentalFormComponent, {
      data: {history, estate:history.house, action}
    })
  }

  // deleteTenant(history: any){
  //   console.log(history);
  //   this.dialog.open(ConfirmComponent, {
  //     data:
  //   })
  // }
}
