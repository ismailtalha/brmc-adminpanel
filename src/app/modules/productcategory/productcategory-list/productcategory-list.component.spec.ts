import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductcategoryListComponent } from './productcategory-list.component';

describe('ProductcategoryListComponent', () => {
  let component: ProductcategoryListComponent;
  let fixture: ComponentFixture<ProductcategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductcategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductcategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
