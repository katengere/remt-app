import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { StorageService } from '../../../auth/services/storage.service';
import { HouseEntityService } from '../../../shared/services/house-entity.service';
import { MessageService } from '../../../shared/services/message.service';
import { UserEntityService } from '../../../shared/services/user-entity.service';
import { UserTypeInterface } from '../../types/userTypes';

@Component({
  selector: 'app-add-properties',
  templateUrl: './add-properties.component.html',
  styleUrls: ['./add-properties.component.css']
})
export class AddPropertiesComponent {
  // newHouse: HouseInterface = {owner_Id: '',_id: '',region:'',district: '',ward:'',street: '',type: '',open: false};
  houseTypes = ['appartment', 'single rooms', 'self contained rooms', 'family house'];
  lga!: UserTypeInterface;
  houseDetailsForm: FormGroup;
  action!: string;
  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private dialog: MatDialog,
    private msgService: MessageService,
    private houseEntityService: HouseEntityService,
    private userEntityService: UserEntityService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ){
    this.houseDetailsForm = this.formBuilder.group({
      owner_Id:[dialogData.user._id, Validators.required],
      _id:[dialogData.estate._id],
      admin_Id:[storageService.getUserTypeName().toLowerCase()=== 'lga' ? storageService.getId() : undefined],
      region:['', Validators.required],
      district:['', Validators.required],
      ward:['', Validators.required],
      street:['', Validators.required],
      type:['', Validators.required],
      open:[false, Validators.required],
      rooms:[0, Validators.required],
      caretakerPhoneNo:[''],
      description:['', Validators.required],
    });
    if (this.dialogData) {
      this.action = dialogData.action;
      this.houseDetailsForm.patchValue(dialogData.estate);
      if (dialogData.estate.caretakers) {
        dialogData.estate.caretakers.length>0 ? this.houseDetailsForm.get('caretakerPhoneNo')?.patchValue(dialogData.estate.caretakers[0].userInfos.phoneNumber) : 
        this.houseDetailsForm.get('caretakerPhoneNo')?.patchValue('');
      } else{this.houseDetailsForm.get('caretakerPhoneNo')?.patchValue('');}
    }
  }
  addProperty(){
    if (!this.houseDetailsForm.valid) {
       this.msgService.message({
        text: 'Please make sure to fill the form correctly before submit',
        title: 'Property Register Failure',
        color: 'red',
      });
    } else {
      console.log(this.houseDetailsForm.value); 
      this.houseEntityService.add(this.houseDetailsForm.value).subscribe({
        next:house=>{
          console.log(house);
          this.dialog.closeAll();
          this.userEntityService.getAll();
        },
        error: err=>{
          console.log(err);
          
          this.msgService.message({
            text: err.message,
            title: 'Property Register Failure',
            color: 'red',
          });
        }
      });
    }    
    }
    editProperty(){
      if (!this.houseDetailsForm.valid) {
        this.msgService.message({
         text: 'Please make sure to fill the form correctly before submit',
         title: 'Property Edit Failure',
         color: 'red',
       });
     } else {
       console.log(this.houseDetailsForm.value); 
       this.houseEntityService.update(this.houseDetailsForm.value).subscribe({
         next:house=>{
           console.log(house);
           this.dialog.closeAll();
           this.userEntityService.getAll();
         },
         error: err=>{
           console.log(err);
           
           this.msgService.message({
             text: err.message,
             title: 'Property Register Failure',
             color: 'red',
           });
         }
       });
     }    
    }
    deleteProperty(){
      this.houseEntityService.delete(this.houseDetailsForm.value).subscribe({
        next:house=>{
          console.log(house);
          this.dialog.closeAll();
        },
        error: err=>{
          console.log(err);
          this.msgService.message({
            text: err.message,
            title: 'Property Register Failure',
            color: 'red',
          });
        }
      });
    }
}

