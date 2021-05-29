import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-unit',
  templateUrl: './add-unit.component.html',
  styleUrls: ['./add-unit.component.css']
})
export class AddUnitComponent implements OnInit {

  constructor(private dataService: DataService, private loader: NgxUiLoaderService, 
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }

  units = new FormGroup({
    unitname: new FormControl(null, Validators.required),
    unitdescription: new FormControl(null),
    unitno:new FormControl(null),
    rowno:new FormControl(null),
    authenticationtoken:new FormControl(null)
  
  });
  edit: any;
  ngOnInit(): void {
    if(this.route.snapshot.params.id) {
      this.edit = this.route.snapshot.params.id;
      let id = this.route.snapshot.params.id;
      this.loader.start();
      this.dataService.getUnitById(id).subscribe((res: any)=>{
        
        let data = res;
        
        this.units.patchValue({
          unitname: data?.unitname,
          unitdescription: data?.unitdescription,
          unitno: data?.unitno,
          rowno:data?.rowno
        });
        this.loader.stop();
      },(err)=>{
        console.log(err);
        this.loader.stop();
      });
    }
  }

  create() {
    if(this.units.valid) {
      this.units.value.authenticationtoken = localStorage.getItem('authtoken')
      this.loader.start();
      if (this.edit) {
        this.dataService.addoreditUnit(this.units.value).subscribe((res:any)=>{
          console.log(res);
          if(res.errorstatusno == 1)
          {
            this.loader.stop();
            this.router.navigate(['unit']);
            this.toastr.success(' Unit Updated Successfully');
          }
          else
          {
            this.loader.stop();
            this.toastr.warning(res.errortext);
          }
        
        },(err)=>{
          console.log(err);
          this.toastr.error(err, "Error");
          this.loader.stop();
        });
      } else {
        this.dataService.addoreditUnit(this.units.value).subscribe((res:any)=>{
          console.log(res);
          if(res.errorstatusno == 1)
          {
            this.loader.stop();
            this.router.navigate(['unit']);
            this.toastr.success(' Unit Added Successfully');
          }
          else
          {
            this.loader.stop();
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
