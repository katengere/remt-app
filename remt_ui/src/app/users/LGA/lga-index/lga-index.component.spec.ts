import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LgaIndexComponent } from './lga-index.component';

describe('LgaIndexComponent', () => {
  let component: LgaIndexComponent;
  let fixture: ComponentFixture<LgaIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LgaIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LgaIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
