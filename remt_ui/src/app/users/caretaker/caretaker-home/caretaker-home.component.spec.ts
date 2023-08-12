import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaretakerHomeComponent } from './caretaker-home.component';

describe('CaretakerHomeComponent', () => {
  let component: CaretakerHomeComponent;
  let fixture: ComponentFixture<CaretakerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaretakerHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaretakerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
