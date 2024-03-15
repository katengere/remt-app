import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { StorageService } from '../../../auth/services/storage.service';
import { HouseEntityService } from '../../../shared/services/house-entity.service';
import { UserEntityService } from '../../../shared/services/user-entity.service';
import { HouseInterface } from '../../types/userTypes';

@Component({
  selector: 'app-tenant-home',
  templateUrl: './tenant-home.component.html',
  styleUrls: ['./tenant-home.component.css']
})
export class TenantHomeComponent implements OnInit {
  houses: HouseInterface[] = [];
  groupedHouses: any[] = [];
  constructor(
    private houseEntityService: HouseEntityService,
    private userEntityService: UserEntityService,
    private storage: StorageService
  ) {
    combineLatest([houseEntityService.entities$, userEntityService.entities$]).subscribe({
      next: ([houses, users]) => {
        this.houses = houses.filter(h => h.rental_history?.find(r => r.client == storage.getId()));
        console.log(this.houses);
        this.groupedHouses = this.houses.reduce((acc, cv) => {
          const grouped = cv.rental_history?.filter(h => h.client == this.storage.getId())?.map((h, i, arr) => {
            const from = h.from, to = h.to;
            const newCv = { ...cv, from, to, owner_Id: users.find(u => u._id == cv.owner_Id) };
            return newCv;
          }, []) as [];
          return [...acc, ...grouped]
        }, []);
        console.log(this.groupedHouses);
      }
    })
  }

  ngOnInit(): void {
    this.houseEntityService.getAll();
  }

}
