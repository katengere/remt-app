import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MngTenantsComponent } from './mng-tenants.component';

describe('MngTenantsComponent', () => {
  let component: MngTenantsComponent;
  let fixture: ComponentFixture<MngTenantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MngTenantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MngTenantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
