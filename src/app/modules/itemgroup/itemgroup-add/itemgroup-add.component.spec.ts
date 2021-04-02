import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemgroupAddComponent } from './itemgroup-add.component';

describe('ItemgroupAddComponent', () => {
  let component: ItemgroupAddComponent;
  let fixture: ComponentFixture<ItemgroupAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemgroupAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemgroupAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
