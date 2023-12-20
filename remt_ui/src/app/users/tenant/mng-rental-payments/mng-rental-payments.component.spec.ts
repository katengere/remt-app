import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MngRentalPaymentsComponent } from './mng-rental-payments.component';

describe('MngRentalPaymentsComponent', () => {
  let component: MngRentalPaymentsComponent;
  let fixture: ComponentFixture<MngRentalPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MngRentalPaymentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MngRentalPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
