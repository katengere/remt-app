import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent {
  invoice: any
  invoiceForm!: FormGroup;
  total = 0;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private msg: MessageService
    ) {
    this.invoiceForm = this.formBuilder.group({
    service: ['', Validators.required],
    rate: ['', Validators.required],
    hours: ['', Validators.required],
    paid: ['', Validators.required]
    });
    }
    saveInvoice(){
      if (this.invoiceForm.valid) {
          this.msg.message({
          title:'Form Submit Success',
          text:'successfully submited',
          color:'green'
        });
        this.invoiceForm.reset();
        return;     
      }
     return this.msg.message({
        title:'Invalid Form',
        text:'Please fill the required fields before submit',
        color:'red'
      });
    }
}
