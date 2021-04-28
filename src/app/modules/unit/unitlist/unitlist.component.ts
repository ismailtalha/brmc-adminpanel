import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-unitlist',
  templateUrl: './unitlist.component.html',
  styleUrls: ['./unitlist.component.css']
})
export class UnitlistComponent implements OnInit {
  unitRecords: any = {
    data: [],
    cols: [
      { field: 'unitno', header: 'Unit no' },
      { field: 'unitname', header: 'UnitName' },
      { field: 'unitdescription', header: 'Description' },
      
    ],
    first: 0,
    rows: 60,
    approvedTotalRows: 0,
    columns: [],
    globalFilter:true,
    IsEdit:true,
    IsDelete:true,
    IsDetail:false,
    screen:'unit'
  };
  constructor(private dataService: DataService,
    private loader: NgxUiLoaderService,
    private router: Router) { }

    ngOnInit(): void {
      this.loader.start();
      this.dataService.getUnits().subscribe((res: any) =>{
        
          this.unitRecords.data = [...res];
          this.loader.stop();
        
      },(err)=>{
        console.log(err);
        this.loader.stop();
      });
    }
    onEdit(singledata) {
      debugger
      this.router.navigate(['/unit/edit', singledata?.unitno]);
    }
  
    // onDelete(data) {
    //   var r = confirm("Are Your Sure Your Want to delete?");
    //   if (r === true) {
    //     this.loader.start();
    //   this.dataService.deleteUser(data?.id).subscribe((res: any) =>{
    //    console.log(res);
    //    this.loader.stop();
    //    this.ngOnInit();
    //   },(err)=>{
    //     this.loader.stop();
    //   });
    //   }
    // }
}
