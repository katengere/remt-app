import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MngPropertiesComponent } from './mng-properties.component';

describe('MngPropertiesComponent', () => {
  let component: MngPropertiesComponent;
  let fixture: ComponentFixture<MngPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MngPropertiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MngPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
