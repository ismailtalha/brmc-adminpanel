import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitlistComponent } from './unitlist.component';

describe('UnitlistComponent', () => {
  let component: UnitlistComponent;
  let fixture: ComponentFixture<UnitlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
