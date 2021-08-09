import { Injectable } from "@angular/core";
import { company } from "../models/company";



@Injectable({
    providedIn: 'root'
  })
  export class GetDataService {
    companydata:company;
  
    constructor() {
         this.companydata = new company();
    
     }

   
  }