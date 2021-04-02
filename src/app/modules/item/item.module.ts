import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemAddComponent } from './item-add/item-add.component';
import { ItemRoutingModule } from './item-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [ItemListComponent, ItemAddComponent],
  imports: [
    CommonModule,
    ItemRoutingModule,
    ReactiveFormsModule,
    TableModule,
    NgSelectModule
  ]
})
export class ItemModule { }
