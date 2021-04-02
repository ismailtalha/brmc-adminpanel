import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemAddComponent } from './item-add/item-add.component';
import { ItemListComponent } from './item-list/item-list.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ItemListComponent,
      }   
    ]
  },
  {
    path: 'add',
    component: ItemAddComponent
  },
  {
    path: 'edit/:id',
    component: ItemAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule { }
