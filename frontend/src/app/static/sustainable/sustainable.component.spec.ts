import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SustainableComponent } from './sustainable.component';

describe('SustainableComponent', () => {
  let component: SustainableComponent;
  let fixture: ComponentFixture<SustainableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SustainableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SustainableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
