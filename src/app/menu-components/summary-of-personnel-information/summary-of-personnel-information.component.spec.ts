import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryOfPersonnelInformationComponent } from './summary-of-personnel-information.component';

describe('SummaryOfPersonnelInformationComponent', () => {
  let component: SummaryOfPersonnelInformationComponent;
  let fixture: ComponentFixture<SummaryOfPersonnelInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryOfPersonnelInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryOfPersonnelInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
