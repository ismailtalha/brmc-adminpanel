import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserComponent } from './user/user.component';
import {TableModule} from 'primeng/table';
import { NewUserComponent } from './new-user/new-user.component';
import {ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [UserComponent, NewUserComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    TableModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class UsersModule { }
