import { Component, OnInit } from '@angular/core';
export interface Product{
  name:string, category:string, price:number, rating:string, feedback:string, images:string, id:string
}
@Component({
  selector: 'll-dashboard-saved-item',
  templateUrl: './dashboard-saved-item.component.html',
  styleUrls: ['./dashboard-saved-item.component.css']
})
export class DashboardSavedItemComponent implements OnInit {
  view = 'list';

  products: Product[] = [];
  constructor() {}

  ngOnInit(): void {
    this.products = [];
  }
}
