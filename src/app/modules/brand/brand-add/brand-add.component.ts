import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  constructor(private dataService: DataService, private loader: NgxUiLoaderService, 
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }
  brands = new FormGroup({
    makename: new FormControl(null, Validators.required),
    discountpercentage: new FormControl(null),
    makeno:new FormControl(null)
  
  });
  edit: any;
  ngOnInit(): void {
    if(this.route.snapshot.params.id) {
      this.edit = this.route.snapshot.params.id;
      let id = this.route.snapshot.params.id;
      this.loader.start();
      this.dataService.getBrandById(id).subscribe((res: any)=>{
        
        let data = res;
        
        this.brands.patchValue({
          makename: data?.makename,
          discountpercentage: data?.discountpercentage,
          makeno : data?.makeno
        });
        this.brands.value.makeno = data;
        this.loader.stop();
      },(err)=>{
        console.log(err);
        this.loader.stop();
      });
    }
  }

  create() {
    if(this.brands.valid) {
      this.loader.start();
      if (this.edit) {
        this.dataService.addoreditBrand(this.brands.value).subscribe((res:any)=>{
          console.log(res);
          this.loader.stop();
          if(res.errorstatusno == 1)
          {
            this.router.navigate(['brand']);
            this.toastr.success(' Brand Updated Successfully');
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
        this.dataService.addoreditBrand(this.brands.value).subscribe((res:any)=>{
          console.log(res);
          this.loader.stop();
          if(res.errorstatusno == 1)
          {
            
            this.router.navigate(['brand']);
            this.toastr.success('New Brand Added Successfully');
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
