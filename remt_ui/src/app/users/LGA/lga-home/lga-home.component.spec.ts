import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LgaHomeComponent } from './lga-home.component';

describe('LgaHomeComponent', () => {
  let component: LgaHomeComponent;
  let fixture: ComponentFixture<LgaHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LgaHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LgaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
