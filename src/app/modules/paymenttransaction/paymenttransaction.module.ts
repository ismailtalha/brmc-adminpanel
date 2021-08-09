import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddpaymentComponent } from './addpayment/addpayment.component';
import { PaymentTrasactionRouting } from './paymenttransaction-routing.module';
import { PaymentlistComponent } from './paymentlist/paymentlist.component';
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [AddpaymentComponent, PaymentlistComponent],
  imports: [
    CommonModule,
    PaymentTrasactionRouting,
    TableModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PaymenttransactionModule { }
