import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitTenantsComponent } from './recruit-tenants.component';

describe('RecruitTenantsComponent', () => {
  let component: RecruitTenantsComponent;
  let fixture: ComponentFixture<RecruitTenantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruitTenantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruitTenantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
