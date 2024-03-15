import { Component, OnInit } from '@angular/core';
import { merge } from 'rxjs';
import { UserTypeInterface } from 'src/app/users/types/userTypes';
import { GeolocationService } from '../../shared/services/geolocation.service';
import { MessageService } from '../../shared/services/message.service';
import { UserDataService } from '../../shared/services/user-data.service';
import { UserEntityService } from '../../shared/services/user-entity.service';

@Component({
  selector: 'll-dashboard-index',
  templateUrl: './dashboard-index.component.html',
  styleUrls: ['./dashboard-index.component.css']
})
export class DashboardIndexComponent implements OnInit {
  users$!: UserTypeInterface[];
  constructor(
    private userDataService: UserDataService,
    private geoService: GeolocationService,
    private msgService: MessageService,
    private userEntityService: UserEntityService
  ){
    merge(this.userEntityService.entities$, userEntityService.filteredEntities$).subscribe({
      next:(users)=>{
        this.users$ = users;
      }
    });
  }
  ngOnInit() {
    // this.getPosition()
    // this.userEntityService.getAll();
  }
  // getUsers(pos?:any){
  //   this.msgService.message({
  //     title:'Database Server',
  //     text:'Getting Landlords nearby your location...',
  //     color:'green'
  //   });
  //   const coords = {lat: pos.coords.latitude,lng: pos.coords.longitude};
  //   this.userEntityService.getAll();
  // }
  // getPosition(){
  //   this.msgService.message({
  //     title:'Geolocation API',
  //     text:'Getting your location...',
  //     color:'green'
  //   });
    
  //   this.geoService.getPosition(
  //     this.getUsers.bind(this),
  //     this.showError.bind(this),
  //     this.noGeo.bind(this)
  //   )
  // }
  // private showError(error: any): void {
  //   console.log(error);    
  //   this.msgService.message({
  //     title:'Geolocation Coordinates Error',
  //     text:error.message,
  //     color:'red'
  //   });
  //   this.getUsers({coords:{latitude:-6.8059136, longitude: 39.2331264}});
  //   }
  //   private noGeo(): void {
  //     this.msgService.message({
  //       title:'Geolocation Coordinates Error',
  //       text:'Geolocation not supported by this browser.',
  //       color:'red'
  //     });
  //   }
}
