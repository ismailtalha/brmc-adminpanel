import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { trigger,state,style,transition,animate } from '@angular/animations';


@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
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
export class ItemListComponent implements OnInit {

  constructor(private dataService: DataService,
    private loader: NgxUiLoaderService,
    private router: Router) { }
  Record: any = {
    data: [],
    cols: [
      { field: 'itemno', header: 'Item #' },
      { field: 'itemname', header: 'Item Name' },
      { field: 'itemgroupno', header: 'Item Group' },
      { field: 'productno', header: 'Product' },
      { field: 'makeno', header: 'Brand' },
      { field: 'saleprice', header: 'Sale Price' },
      { field: 'costprice', header: 'Cost Price' },
      // { field: 'itemdetails', header: 'Description' }
    ],
    first: 0,
    rows: 60,
    approvedTotalRows: 0,
    columns: [],
  };
  ngOnInit(): void {
    this.loader.start();
    this.dataService.getItems().subscribe((res: any) =>{
        this.Record.data = [...res];
        console.log(this.Record)
        this.loader.stop();
    },(err)=>{
      console.log(err);
      this.loader.stop();
    });

   
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
}
