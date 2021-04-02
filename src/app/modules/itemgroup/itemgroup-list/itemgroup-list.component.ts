import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-itemgroup-list',
  templateUrl: './itemgroup-list.component.html',
  styleUrls: ['./itemgroup-list.component.css']
})
export class ItemgroupListComponent implements OnInit {

  constructor(private dataService: DataService,
    private loader: NgxUiLoaderService,
    private router: Router) { }
  Records: any = {
    data: [],
    cols: [
      { field: 'itemgroupno', header: 'Item Group No' },
      { field: 'itemgroupname', header: 'Item Group Name' },
      { field: 'discountpercentage', header: 'Discount %' }
      
    ],
    first: 0,
    rows: 60,
    approvedTotalRows: 0,
    columns: [],
  };
  ngOnInit(): void {
    this.loader.start();
    this.dataService.getItemGroup().subscribe((res: any) =>{
      
        this.Records.data = [...res];
        this.loader.stop();
      
    },(err)=>{
      console.log(err);
      this.loader.stop();
    });
  }

  onEdit(data) {
    this.router.navigate(['/itemgroup/edit', data?.itemgroupno]);
  }


}
