import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLandlordsComponent } from './add-landlords.component';

describe('AddLandlordsComponent', () => {
  let component: AddLandlordsComponent;
  let fixture: ComponentFixture<AddLandlordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLandlordsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLandlordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
