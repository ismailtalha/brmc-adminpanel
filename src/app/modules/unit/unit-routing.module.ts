import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUnitComponent } from './add-unit/add-unit.component';
import { UnitlistComponent } from './unitlist/unitlist.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: UnitlistComponent,
      }   
    ]
  },
  {
    path: 'add',
    component: AddUnitComponent
  },
  {
    path: 'edit/:id',
    component: AddUnitComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnitRoutingModule { }
