import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddpaymentComponent } from './addpayment/addpayment.component';
import { PaymentTrasactionRouting } from './paymenttransaction-routing.module';



@NgModule({
  declarations: [AddpaymentComponent],
  imports: [
    CommonModule,
    PaymentTrasactionRouting
  ]
})
export class PaymenttransactionModule { }
