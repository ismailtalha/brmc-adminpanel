import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl,  FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-ledger-report',
  templateUrl: './customer-ledger-report.component.html',
  styleUrls: ['./customer-ledger-report.component.css']
})
export class CustomerLedgerReportComponent implements OnInit {
  customers: any = [];
  selectedCustomer = new FormGroup({
    CustomerId: new FormControl(null, Validators.required),
    CustomerAccountId: new FormControl(null, Validators.required)
  });
  legderReport: any = {
    data: [],
    cols: [
      { field: 'Date', header: 'Date' },
      { field: 'Debit', header: 'Debit' },
      { field: 'Credit', header: 'Credit' },
      { field: 'Balance', header: 'Balance' }
    ],
    first: 0,
    rows: 60,
    approvedTotalRows: 0,
    columns: [],
  };
  creditAmount: number;
  debitAmount: number;

  constructor(private dataService: DataService, private loader: NgxUiLoaderService,
    private router: Router,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loader.start();
    this.dataService.getCustomers().subscribe((customers: any) => {
      if (customers?.code === 200) {
        this.customers = [...customers?.data];
      }
      this.loader.stop();
    }, (err) => {
      this.loader.stop();
    });
  }

  customerLedgerReport() {
    this.loader.start();
    this.dataService.getCustomerReport(this.selectedCustomer.getRawValue().CustomerId, this.selectedCustomer.getRawValue().CustomerAccountId).subscribe((res: any) => {
      if (res?.data?.list.length === 0) {
        this.toastr.error('No record found', "Error");
      } else {
        this.creditAmount = res?.data?.credittotal;
        this.debitAmount = res?.data?.debittotal;
        this.legderReport.data = [...res?.data?.list];
      }
      this.loader.stop();
    }, (err) => {
      this.loader.stop();
      this.toastr.error(err, "Error");
    });
  }

  onCustomerChange(value) {
    const customerId = value.target.value;
    const selectedCustomer = this.customers.find(res => res.id === Number(customerId));
    this.selectedCustomer.patchValue({
      CustomerAccountId: selectedCustomer?.AccountId
    });
  }

  exportExcel() {
    const approved = this.legderReport.data.map(res => {
      return {
        Date: res.Date,
        Debit: res.Debit,
        Credit: res.Credit,
        Balance: res.Balance
      };
    });
    this.dataService.exportExcel(approved);
  }

  exportPDF() {
    const header = [['Date', 'Debit', 'Credit', 'Balance']];
    const approved = this.legderReport.data.map(res => {
      return [
        res.Date,
        res.Debit,
        res.Credit,
        res.Balance
      ];
    });
    this.dataService.exportPdf(header, approved, 'Customer Ledger');
  }
}
