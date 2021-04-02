import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemgroupAddComponent } from './itemgroup-add/itemgroup-add.component';
import { ItemgroupListComponent } from './itemgroup-list/itemgroup-list.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ItemgroupListComponent,
      }   
    ]
  },
  {
    path: 'add',
    component: ItemgroupAddComponent
  },
  {
    path: 'edit/:id',
    component: ItemgroupAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemGroupRoutingModule { }
