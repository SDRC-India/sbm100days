import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationalStructureComponent } from './organisational-structure.component';

describe('OrganisationalStructureComponent', () => {
  let component: OrganisationalStructureComponent;
  let fixture: ComponentFixture<OrganisationalStructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganisationalStructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationalStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
