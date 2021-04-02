import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng';
import { CompanyRoutingModule } from './company-routing.module';



@NgModule({
  declarations: [CompanyInfoComponent],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    ReactiveFormsModule,
    TableModule
  ]
})
export class CompanyModule { }
