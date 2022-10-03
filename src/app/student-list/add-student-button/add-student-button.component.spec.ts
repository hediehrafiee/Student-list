import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentButtonComponent } from './add-student-button.component';

describe('AddStudentButtonComponent', () => {
  let component: AddStudentButtonComponent;
  let fixture: ComponentFixture<AddStudentButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStudentButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
