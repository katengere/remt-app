import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-ngx-chart',
  templateUrl: './admin-ngx-chart.component.html',
  styleUrls: ['./admin-ngx-chart.component.css']
})
export class AdminNgxChartComponent {
  saleData = [
    { name: "Mobiles", value: 105000 },
    { name: "Laptop", value: 55000 },
    { name: "AC", value: 15000 },
    { name: "Headset", value: 150000 },
    { name: "Fridge", value: 20000 }
  ];
}
