import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductcategoryAddComponent } from './productcategory-add/productcategory-add.component';
import { ProductcategoryListComponent } from './productcategory-list/productcategory-list.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ProductcategoryListComponent,
      }   
    ]
  },
  {
    path: 'add',
    component: ProductcategoryAddComponent
  },
  {
    path: 'edit/:id',
    component: ProductcategoryAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductCategoryRoutingModule { }
