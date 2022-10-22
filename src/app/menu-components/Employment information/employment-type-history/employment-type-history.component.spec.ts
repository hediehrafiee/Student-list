import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentTypeHistoryComponent } from './employment-type-history.component';

describe('EmploymentTypeHistoryComponent', () => {
  let component: EmploymentTypeHistoryComponent;
  let fixture: ComponentFixture<EmploymentTypeHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmploymentTypeHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploymentTypeHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
