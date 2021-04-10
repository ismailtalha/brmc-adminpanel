import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {

  constructor(private dataService: DataService,
    private loader: NgxUiLoaderService,
    private router: Router) { }
  Records: any = {
    data: [],
    cols: [
      { field: 'makeno', header: 'Brand No' },
      { field: 'makename', header: 'Brand Name' },
      { field: 'discountpercentage', header: 'Discount %' }

    ],
    first: 0,
    rows: 60,
    approvedTotalRows: 0,
    columns: [],
    globalFilter:true,
    IsEdit:true,
    IsDelete:true,
    IsDetail:false,
    screen:'brand'
  };
  ngOnInit(): void {
    this.loader.start();
    this.dataService.getBrands().subscribe((res: any) => {

      this.Records.data = [...res];
      this.loader.stop();

    }, (err) => {
      console.log(err);
      this.loader.stop();
    });
  }

  onEdit(data) {
    this.router.navigate(['/brand/edit', data?.makeno]);
  }





}
