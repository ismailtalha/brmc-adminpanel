import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductcategoryAddComponent } from './productcategory-add/productcategory-add.component';
import { ProductcategoryListComponent } from './productcategory-list/productcategory-list.component';
import { ProductCategoryRoutingModule } from './productcategory-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [ProductcategoryAddComponent, ProductcategoryListComponent],
  imports: [
    CommonModule,
    ProductCategoryRoutingModule,
    ReactiveFormsModule,
    TableModule,
    SharedModule
  ]
})
export class ProductcategoryModule { }
