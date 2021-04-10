import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemgroupAddComponent } from './itemgroup-add/itemgroup-add.component';
import { ItemgroupListComponent } from './itemgroup-list/itemgroup-list.component';
import { ItemGroupRoutingModule } from './itemgroup-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [ItemgroupAddComponent, ItemgroupListComponent],
  imports: [
    CommonModule,
    ItemGroupRoutingModule,
    ReactiveFormsModule,
    TableModule,
    SharedModule
  ]
})
export class ItemgroupModule { }
