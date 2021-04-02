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
        { field: 'deliveryaddress', header: 'Delivery Address' },
        { field: 'totalamount', header: 'Total AMount' },
        { field: 'totaldiscount', header: 'Total Discount' },
        { field: 'totalgst', header: 'Total GST' },
        { field: 'custname', header: 'Customer Name' },
        { field: 'orderstatusname', header: 'Status' }
  
        
      ],
      first: 0,
      rows: 60,
      approvedTotalRows: 0,
      columns: [],
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
