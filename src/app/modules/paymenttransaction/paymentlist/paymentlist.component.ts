import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-paymentlist',
  templateUrl: './paymentlist.component.html',
  styleUrls: ['./paymentlist.component.css']
})
export class PaymentlistComponent implements OnInit {

  constructor(private dataService: DataService,
    private loader: NgxUiLoaderService,
    private router: Router) { }

    Records: any = {
      data: [],
      cols: [
        { field: 'docno', header: 'Doc No' },
        { field: 'docdate', header: 'Date' ,data: true, format: `dd/MM/yyyy`},
        { field: 'fromaccountname', header: 'From Account Name' },
        { field: 'referenceno', header: 'Reference No' },
        { field: 'totalamount', header: 'Total Amount' },
        { field: 'currency', header: 'Currency' },
        { field: 'paymentmethodname', header: 'Payment Mode' }
      ],
      first: 0,
      rows: 60,
      approvedTotalRows: 0,
      columns: [],
      globalFilter:true,
      IsEdit:false,
      IsDelete:false,
      IsDetail:false,
      screen:'Payment'
    };
    ngOnInit(): void {
      this.loader.start();
      this.dataService.getallpaymnets().subscribe((res: any) => {
  
        this.Records.data = [...res];
        this.loader.stop();
  
      }, (err) => {
        console.log(err);
        this.loader.stop();
      });
    }
  
    onEdit(data) {
      this.router.navigate(['/payment/edit', data?.makeno]);
    }
}
