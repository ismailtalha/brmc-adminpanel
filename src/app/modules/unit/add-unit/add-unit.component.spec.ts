import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUnitComponent } from './add-unit.component';

describe('AddUnitComponent', () => {
  let component: AddUnitComponent;
  let fixture: ComponentFixture<AddUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
