import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandListComponent } from './brand-list/brand-list.component';
import { BrandAddComponent } from './brand-add/brand-add.component';
import { BrandRoutingModule } from './brand-routing.module';
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [BrandListComponent, BrandAddComponent],
  imports: [
    CommonModule,
    BrandRoutingModule,
    TableModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class BrandModule { }
