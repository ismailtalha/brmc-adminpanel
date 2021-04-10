import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PtableComponent } from './ptable/ptable.component';
import { UsersRoutingModule } from '../users/users-routing.module';
import { TableModule } from 'primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [PtableComponent],
  imports: [
    CommonModule,
    TableModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    PtableComponent
  ]
})
export class SharedModule { }

