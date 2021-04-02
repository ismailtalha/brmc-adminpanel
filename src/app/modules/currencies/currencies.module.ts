import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrenciesRoutingModule } from './currencies-routing.module';
import { CurrenciesComponent } from './currencies/currencies.component';
import { AddNewCurrenciesComponent } from './add-new-currencies/add-new-currencies.component';
import {TableModule} from 'primeng/table';
import {ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { BaseComponent } from 'src/app/components/base/base.component';

@NgModule({
  declarations: [CurrenciesComponent, AddNewCurrenciesComponent],
  imports: [
    CommonModule,
    TableModule,
    ReactiveFormsModule,
    CurrenciesRoutingModule,
    ComponentsModule
  ]
})
export class CurrenciesModule { }
