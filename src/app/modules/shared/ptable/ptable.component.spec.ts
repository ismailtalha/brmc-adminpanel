import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PtableComponent } from './ptable.component';

describe('PtableComponent', () => {
  let component: PtableComponent;
  let fixture: ComponentFixture<PtableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
