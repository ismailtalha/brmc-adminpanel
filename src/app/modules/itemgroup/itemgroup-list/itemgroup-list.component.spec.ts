import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemgroupListComponent } from './itemgroup-list.component';

describe('ItemgroupListComponent', () => {
  let component: ItemgroupListComponent;
  let fixture: ComponentFixture<ItemgroupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemgroupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemgroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
