import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalTabsItemsComponent } from './personal-tabs-items.component';

describe('PersonalTabsItemsComponent', () => {
  let component: PersonalTabsItemsComponent;
  let fixture: ComponentFixture<PersonalTabsItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalTabsItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalTabsItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
