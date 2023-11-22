import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MngCaretakersComponent } from './mng-caretakers.component';

describe('MngCaretakersComponent', () => {
  let component: MngCaretakersComponent;
  let fixture: ComponentFixture<MngCaretakersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MngCaretakersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MngCaretakersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
