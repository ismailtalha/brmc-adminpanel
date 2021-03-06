import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { DboperationsComponent } from 'src/app/dboperations/dboperations.component';

@Component({
  selector: 'app-cutomer',
  templateUrl: './cutomer.component.html',
  styleUrls: ['./cutomer.component.css']
})
export class CutomerComponent extends DboperationsComponent implements OnInit {
  Record: any = {
    data: [],
    cols: [
      { field: 'custno', header: 'custno' },
      { field: 'custname', header: 'Name' },
      { field: 'address', header: 'Address' },
      { field: 'contact', header: 'Contact' },
      { field: 'email', header: 'Email' },
      { field: 'block', header: 'IsBlock' },

      
    ],
    first: 0,
    rows: 60,
    approvedTotalRows: 0,
    columns: [],
    globalFilter:true,
    IsEdit:true,
    IsDelete:true,
    IsDetail:false,
    screen:'customer'
  };
  constructor(public dataService: DataService,
    public loader: NgxUiLoaderService,
    public router: Router) {
    super();
  }

  ngOnInit(): void {
    this.loader.start();
    this.dataService.getCustomers().subscribe((res: any) =>{
        this.Record.data = [...res];
        console.log(this.Record)
        this.loader.stop();
    },(err)=>{
      console.log(err);
      this.loader.stop();
    });
  }

  onDelete(data) {
    console.log(data?.id);
    var r = confirm("Are Your Sure Your Want to delete?");
    if (r === true) {
      this.loader.start();
      this.dataService.deleteCustomer(data?.id).subscribe((res: any) =>{
      console.log(res);
      this.loader.stop();
      this.ngOnInit();
      },(err)=>{
        console.log(err);
        this.loader.stop();
      });
    }
  }

  onEdit(data) {
    debugger
    console.log(data);
    this.router.navigate(['/customers/edit-customer', data?.custno]);
  }

}
