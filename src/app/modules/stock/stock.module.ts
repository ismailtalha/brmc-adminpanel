import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StocklistComponent } from './stocklist/stocklist.component';
import { TableModule } from 'primeng/table';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { StockRouting } from './stock-routing.module';
import { CheckboxModule } from 'primeng';
import { OnlyNumber } from 'src/app/Utilities/positivenumber.directive';


@NgModule({
  declarations: [StocklistComponent,OnlyNumber],
  imports: [
    CommonModule,
    TableModule,
    ReactiveFormsModule,
    SharedModule,
    StockRouting,
    CheckboxModule,
    FormsModule
  ]
})
export class StockModule { }
