import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, 
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'auth',
        loadChildren: './modules/auth/auth.module#AuthModule'
      }
    ]
  },
  {
    path: '',
    component: FullLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: './modules/dashboard/dashboard.module#DashboardModule', canActivate:[AuthGuardService]
      },
      {
        path: 'brand',
        loadChildren: './modules/brand/brand.module#BrandModule', canActivate:[AuthGuardService]
      },
      {
        path: 'unit',
        loadChildren: './modules/unit/unit.module#UnitModule', canActivate:[AuthGuardService]
      },
      {
        path: 'itemgroup',
        loadChildren: './modules/itemgroup/itemgroup.module#ItemgroupModule', canActivate:[AuthGuardService]
      },
      {
        path: 'productcategory',
        loadChildren: './modules/productcategory/productcategory.module#ProductcategoryModule', canActivate:[AuthGuardService]
      },
      {
        path: 'item',
        loadChildren: './modules/item/item.module#ItemModule', canActivate:[AuthGuardService]
      },
      {
        path: 'company',
        loadChildren: './modules/company/company.module#CompanyModule', canActivate:[AuthGuardService]
      },
      {
        path: 'order',
        loadChildren: './modules/order/order.module#OrderModule', canActivate:[AuthGuardService]
      },
      {
        path: 'users',
        loadChildren: './modules/users/users.module#UsersModule', canActivate:[AuthGuardService]
      },
     
      {
        path: 'customers',
        loadChildren: './modules/customers/customers.module#CustomersModule', canActivate:[AuthGuardService]
      },
      {
        path: 'paymenttransaction',
        loadChildren: './modules/brand/brand.module#BrandModule', canActivate:[AuthGuardService]
      },
     
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
