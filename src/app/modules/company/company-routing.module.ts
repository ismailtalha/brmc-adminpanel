import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyInfoComponent } from './company-info/company-info.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CompanyInfoComponent,
      }   
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
