import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { exhaustMap } from 'rxjs';
import { UserEntityService } from 'src/app/shared/services/user-entity.service';
import { HouseInterface, UserTypeInterface } from '../../types/userTypes';
import { MessageService } from 'src/app/shared/services/message.service';
import { GroupedEstates } from '../../mainAdmin/main-admin-home/main-admin-home.component';

@Component({
  selector: 'app-landlord-home',
  templateUrl: './landlord-home.component.html',
  styleUrls: ['./landlord-home.component.css']
})
export class LandlordHomeComponent implements OnInit {
  landlord!: UserTypeInterface;
  id!:string;
  estates!: GroupedEstates[]
  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private userEntityService: UserEntityService,
    private msg: MessageService
    ) {}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(exhaustMap((param:Params)=>{
      this.id = param['id'];
      return this.userEntityService.entities$;
    })).subscribe({
      next:(users)=>{
        this.landlord = users.find(usrs=>usrs.id==this.id) as UserTypeInterface;
        this.estates = this.landlord.estates!.reduce((acc:GroupedEstates[], obj:HouseInterface)=>{
          let houseType = obj.type.toLowerCase();
          let groupedEstates: GroupedEstates = {name:houseType, value:0}
          if (!acc.includes(acc[acc.findIndex(u=>u.name==obj.type.toLowerCase())])) {
            groupedEstates.value += 1;
            return [...acc, groupedEstates]
          }
          const found = acc.find(u=>u.name==obj.type.toLowerCase());
          if (found) {
            found.value += 1;
            acc.splice(acc.findIndex(u=>u.name==found.name), 1, found);
            return [...acc];
          }
          return acc
        }, [] as GroupedEstates[]);          
      },
      error:(err)=>{        
        this.msg.message({title:'Incorrect Credentials', text:err.message, color:'red'});
      }
    })
  }

}
