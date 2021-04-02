import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dboperations',
  templateUrl: './dboperations.component.html',
  styleUrls: ['./dboperations.component.css']
})
export class DboperationsComponent implements OnInit {
  public dataService: DataService;
  public loader: NgxUiLoaderService;
  public router: Router;
  constructor() { }

  getalldata(servicename)
  {
    debugger
    let data  = {
      list:[],
      status:0,
      errormsg:""
    };
    this.loader.start();
    let service = this.dataService[servicename]();
    service.subscribe((res: any) =>{
      debugger
        data.list = [...res];
        data.status = 1;
        data.errormsg = "";
        this.loader.stop();
    },(err)=>{
      console.log(err);
      data.status = 0;
      data.errormsg = err;
      this.loader.stop();
    });
    return data;
  }

  ngOnInit(): void {
  }

}
