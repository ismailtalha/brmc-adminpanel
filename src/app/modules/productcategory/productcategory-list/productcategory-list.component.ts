import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-productcategory-list',
  templateUrl: './productcategory-list.component.html',
  styleUrls: ['./productcategory-list.component.css']
})
export class ProductcategoryListComponent implements OnInit {

  constructor(private dataService: DataService,
    private loader: NgxUiLoaderService,
    private router: Router) { }
  Records: any = {
    data: [],
    cols: [
      { field: 'productno', header: 'Category No' },
      { field: 'productname', header: 'Category Name' },
      { field: 'discountpercentage', header: 'Discount %' },
      { field: 'itemgroupno', header: 'Group No' }
      
    ],
    first: 0,
    rows: 60,
    approvedTotalRows: 0,
    columns: [],
    globalFilter:true,
    IsEdit:true,
    IsDelete:true,
    IsDetail:false,
    screen:'category'
  };
  ngOnInit(): void {
    this.loader.start();
    this.dataService.getCategories().subscribe((res: any) =>{
      
        this.Records.data = [...res];
        this.loader.stop();
      
    },(err)=>{
      console.log(err);
      this.loader.stop();
    });
  }

  onEdit(data) {
    this.router.navigate(['/productcategories/edit', data?.productno]);
  }

}
