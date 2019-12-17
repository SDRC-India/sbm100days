import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SosoComponent } from './soso.component';

describe('SosoComponent', () => {
  let component: SosoComponent;
  let fixture: ComponentFixture<SosoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SosoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SosoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
