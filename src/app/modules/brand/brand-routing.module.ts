import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrandAddComponent } from './brand-add/brand-add.component';
import { BrandListComponent } from './brand-list/brand-list.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: BrandListComponent,
      }   
    ]
  },
  {
    path: 'add',
    component: BrandAddComponent
  },
  {
    path: 'edit/:id',
    component: BrandAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandRoutingModule { }
