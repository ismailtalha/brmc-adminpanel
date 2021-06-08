import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddpaymentComponent } from './addpayment/addpayment.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AddpaymentComponent,
      }   
    ]
  },
  {
    path: 'add',
    component: AddpaymentComponent
  },
  {
    path: 'edit/:id',
    component: AddpaymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentTrasactionRouting { }
