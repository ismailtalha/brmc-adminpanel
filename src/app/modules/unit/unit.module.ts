import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitlistComponent } from './unitlist/unitlist.component';
import { AddUnitComponent } from './add-unit/add-unit.component';
import { UnitRoutingModule } from './unit-routing.module';
import { TableModule } from 'primeng';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [UnitlistComponent, AddUnitComponent],
  imports: [
    CommonModule,
    UnitRoutingModule,
    TableModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class UnitModule { }
