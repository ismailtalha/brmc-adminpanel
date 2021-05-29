import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-itemgroup-add',
  templateUrl: './itemgroup-add.component.html',
  styleUrls: ['./itemgroup-add.component.css']
})
export class ItemgroupAddComponent implements OnInit {

  constructor(private dataService: DataService, private loader: NgxUiLoaderService, 
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }

    itemgroups = new FormGroup({
      itemgroupname: new FormControl(null, Validators.required),
      discountpercentage: new FormControl(null),
      itemgroupno:new FormControl(null),
      rowno:new FormControl(null),
      authenticationtoken:new FormControl(null)
    
    });
    edit: any;
    ngOnInit(): void {
      if(this.route.snapshot.params.id) {
        this.edit = this.route.snapshot.params.id;
        let id = this.route.snapshot.params.id;
        this.loader.start();
        this.dataService.getItemGroupById(id).subscribe((res: any)=>{
          
          let data = res;
          
          this.itemgroups.patchValue({
            itemgroupname: data?.itemgroupname,
            discountpercentage: data?.discountpercentage,
            itemgroupno : data?.itemgroupno,
            rowno:data?.rowno
          });
          this.itemgroups.value.itemgroupno = data;
          this.loader.stop();
        },(err)=>{
          console.log(err);
          this.loader.stop();
        });
      }
    }
  
    create() {
      if(this.itemgroups.valid) {
        this.itemgroups.value.authenticationtoken = localStorage.getItem('authtoken')
        this.loader.start();
        if (this.edit) {
          this.dataService.addoreditItemGroup(this.itemgroups.value).subscribe((res:any)=>{
            console.log(res);
            this.loader.stop();
            if(res.errorstatusno == 1)
            {
              this.router.navigate(['itemgroup']);
              this.toastr.success(' Item Group Updated Successfully');
            }
            else
            {
              this.toastr.warning(res.errortext);
            }
           
          },(err)=>{
            console.log(err);
            this.toastr.error(err, "Error");
            this.loader.stop();
          });
        } else {
          this.dataService.addoreditItemGroup(this.itemgroups.value).subscribe((res:any)=>{
            console.log(res);
            this.loader.stop();
            if(res.errorstatusno == 1)
            {
              this.router.navigate(['itemgroup']);
              this.toastr.success('New Item Group Added Successfully');
            }
            else
            {
              this.toastr.warning(res.errortext);
            }
          },(err)=>{
            console.log(err);
            this.toastr.error(err, "Error");
            this.loader.stop();
          });
        }
      } else {
        this.toastr.error("Please Fill all fields", "Error");
      }
    }

}
