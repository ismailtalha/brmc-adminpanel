import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderRoutingModule } from './order-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [OrderListComponent, OrderDetailComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    ReactiveFormsModule,
    TableModule,
    SharedModule
  ]
})
export class OrderModule { }
