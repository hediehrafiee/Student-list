import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalPanelComponent } from './personal-panel.component';

describe('PersonalPanelComponent', () => {
  let component: PersonalPanelComponent;
  let fixture: ComponentFixture<PersonalPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
