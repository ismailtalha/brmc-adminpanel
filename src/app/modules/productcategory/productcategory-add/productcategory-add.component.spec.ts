import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductcategoryAddComponent } from './productcategory-add.component';

describe('ProductcategoryAddComponent', () => {
  let component: ProductcategoryAddComponent;
  let fixture: ComponentFixture<ProductcategoryAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductcategoryAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductcategoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
