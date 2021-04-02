import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DboperationsComponent } from './dboperations.component';

describe('DboperationsComponent', () => {
  let component: DboperationsComponent;
  let fixture: ComponentFixture<DboperationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DboperationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DboperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
