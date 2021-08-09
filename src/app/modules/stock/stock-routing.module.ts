import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StocklistComponent } from './stocklist/stocklist.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: StocklistComponent,
      }   
    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRouting { }
