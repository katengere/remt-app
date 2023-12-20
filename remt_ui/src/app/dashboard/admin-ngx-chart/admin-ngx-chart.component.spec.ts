import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNgxChartComponent } from './admin-ngx-chart.component';

describe('AdminNgxChartComponent', () => {
  let component: AdminNgxChartComponent;
  let fixture: ComponentFixture<AdminNgxChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNgxChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminNgxChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
