import { Component, Input, OnInit, Output , EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-ptable',
  templateUrl: './ptable.component.html',
  styleUrls: ['./ptable.component.css']
})
export class PtableComponent implements OnInit {
  selectedstatus: any = {};
  constructor(private dataService: DataService,
    private loader: NgxUiLoaderService,
    private router: Router,private toastr: ToastrService) { }

  @Input() Records:any;
  @Output() edit = new EventEmitter<any>();
  allstatus  = [{'orderstatusno':'01','value':'Pending'},{'orderstatusno':'02','value':'Approved'}, {'orderstatusno':'03','value':'Cancelled'}];
  
  ngOnInit(): void {
    
  }
  onEdit(data) {
    this.edit.emit(data);
    // this.router.navigate([this.Records.editurl, data?.docno]);
  }
  onDetail(data)
  {
    this.edit.emit(data);
  }

  onDelete(data) {
    var r = confirm("Are Your Sure Your Want to delete?");
    if (r === true) {
      this.loader.start();
    this.dataService[this.Records.service](data?.docno).subscribe((res: any) =>{
     console.log(res);
     this.loader.stop();
     this.ngOnInit();
    },(err)=>{
      this.loader.stop();
    });
    }
  }
  onChange(data)
  {
    debugger;
    this.dataService.updateOrder(data).subscribe((res: any) => {
      this.router.navigate(['order']);
      this.toastr.success('Order Status Updated Successfully');
    this.loader.stop();
    }, (err) =>  {
      this.loader.stop();
    });
  }
}
