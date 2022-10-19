import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificationsAndInformationComponent } from './specifications-and-information.component';

describe('SpecificationsAndInformationComponent', () => {
  let component: SpecificationsAndInformationComponent;
  let fixture: ComponentFixture<SpecificationsAndInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificationsAndInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificationsAndInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
