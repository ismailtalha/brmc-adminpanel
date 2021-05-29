import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  
  constructor(private dataService: DataService,
    private loader: NgxUiLoaderService,
    private router: Router) { }
    Records: any = {
      data: [],
      cols: [
        { field: 'docno', header: 'Order #' },
        { field: 'docdate', header: 'Date' },
        { field: 'custname', header: 'Customer Name' },        
        { field: 'totalamount', header: 'Total Amount' },
        { field: 'totaldiscount', header: 'Total Discount' },
        { field: 'totalnetamount', header: 'Net Amount' },
        { field: 'currency', header: 'Currency' },
        { field: 'deliverylocation', header: 'Delivery Address' }  ,      
        { field: 'mobileno', header: 'Cell #' }        
        
      ],
      first: 0,
      rows: 60,
      approvedTotalRows: 0,
      columns: [],
      IsEdit:false,
      IsDelete:false,
      IsDetail:true,
      screen:'order',
      globalFilter:true,
    };
  ngOnInit(): void {
    this.loader.start();
    this.dataService.getOrders().subscribe((res: any) =>{
      
        this.Records.data = [...res];
        
        this.loader.stop();
      
    },(err)=>{
      console.log(err);
      this.loader.stop();
    });
  }
  onDetail(data)
  {
    
    this.router.navigate(['/order/orderdetail', data?.docno]);
  }

}
