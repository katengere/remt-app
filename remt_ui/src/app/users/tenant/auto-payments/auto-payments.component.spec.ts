import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoPaymentsComponent } from './auto-payments.component';

describe('AutoPaymentsComponent', () => {
  let component: AutoPaymentsComponent;
  let fixture: ComponentFixture<AutoPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoPaymentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
