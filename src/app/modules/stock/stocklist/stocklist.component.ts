import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-stocklist',
  templateUrl: './stocklist.component.html',
  styleUrls: ['./stocklist.component.css'],
  animations: [
    trigger('rowExpansionTrigger', [
      state('void', style({
        transform: 'translateX(-10%)',
        opacity: 0
      })),
      state('active', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})
export class StocklistComponent implements OnInit {
  selectedRows: any  =[];
  updatearr: any = [];
  rowData: any;
  constructor(private dataService: DataService,
    private loader: NgxUiLoaderService,
    private router: Router, private toaster: ToastrService) { }
  Record: any = {
    data: [],
    cols: [
      
      { field: 'itemno', header: 'Item #' },
      { field: 'itemname', header: 'Item Name' },
      { field: 'itemgroupname', header: 'Item Group' },
      { field: 'productname', header: 'Product' },
      { field: 'makename', header: 'Brand' },
      { field: 'saleprice', header: 'Sale Price' },
      { field: 'costprice', header: 'Cost Price' },
      { field: 'baseunitname', header: 'Base Unit' },
      { field: 'itemstock', header: 'Opening Stock' },
      { field: 'itemstockportaldisplay', header: 'Current Stock' },
      // { field: 'quantity', header: 'Quantity', data: true },
      //  { field: 'itemdetails', header: 'Description' }
    ],
    first: 0,
    rows: 60,
    approvedTotalRows: 0,
    columns: [],
  };
  ngOnInit(): void {
    this.getData();

  }

  getData() {
    this.loader.start();
    this.dataService.getItems().subscribe((res: any) => {
      this.Record.data = [...res];
      console.log(this.Record)
      this.loader.stop();
    }, (err) => {
      console.log(err);
      this.loader.stop();
    });

  }
  bulkupdate() {
    this.loader.start();
    this.dataService.updatebulkdata(this.updatearr).subscribe((res: any) => {
      this.loader.stop();
debugger
      if (res[0].errorstatusno == "1") {
        this.toaster.success('Data Updated Successfully')
        this.selectedRows = [];
        this.getData();
        this.updatearr = [];
      }
      else {
        this.toaster.error(res.errortext)
      }

    }, (err) => {
      console.log(err);
      this.loader.stop();
    });
  }
  checked(row) {
    debugger
    let index = this.updatearr.findIndex((i) => i.unitno == row.factorunit && i.itemno == row.itemno);
    if (index != -1) {
      this.updatearr.splice(index, 1)
      row.quantity = 0;
      return;
    }
    this.updatearr.push({
      "itemno": row.itemno,
      "unitno": row.factorunit,
      "quantity": row.quantity,
      "costprice": row.dcostprice,
      "adjustmenttype": "01",
      "authenticationtoken": localStorage.getItem('authtoken'),
    })
    console.log('updatearr', this.updatearr)
  }

  onDelete(data) {
    let r = confirm('Are Your Sure Your Want to delete?');
    if (r === true) {
      this.loader.start();
      this.dataService.deleteSales(data?.SaleId).subscribe((res: any) => {
        this.ngOnInit();
        this.loader.stop();
      }, (err) => {
        console.log(err);
        this.loader.stop();
      });
    }
  }

  onEdit(data) {
    this.router.navigate(['/item/edit', data?.itemno]);
  }
  selectRow(row) {
    debugger
    let index = this.updatearr.findIndex((i) => i.unitno == row.value.baseunitno && i.itemno == row.value.itemno);
    if (index != -1) {
      this.updatearr.splice(index, 1)
      row.value.quantity = 0;
      return;
    }
    this.updatearr.push({
      "itemno": row.value.itemno,
      "unitno": row.value.baseunitno,
      "quantity": row.value.quantity,
      "costprice": row.costprice,
      "adjustmenttype": "01",
      "authenticationtoken": localStorage.getItem('authtoken'),
    })
    console.log('updatearr', this.updatearr)
  }
}
