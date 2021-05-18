import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-productcategory-add',
  templateUrl: './productcategory-add.component.html',
  styleUrls: ['./productcategory-add.component.css']
})
export class ProductcategoryAddComponent implements OnInit {

  constructor(private dataService: DataService, private loader: NgxUiLoaderService, 
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }
  categories = new FormGroup({
    productname: new FormControl(null, Validators.required),
    discountpercentage: new FormControl(null),
    productno:new FormControl(null),
    itemgroupno: new FormControl(null, Validators.required),
    authenticationtoken:new FormControl(null)
  
  });
  edit: any;
  groupTypes:any=[]
  ngOnInit(): void {
    this.getitemgroups();
    if(this.route.snapshot.params.id) {
      this.edit = this.route.snapshot.params.id;
      let id = this.route.snapshot.params.id;
      this.loader.start();
      this.dataService.getCategoryById(id).subscribe((res: any)=>{
        
        let data = res;
        
        this.categories.patchValue({
          productname: data?.productname,
          discountpercentage: data?.discountpercentage,
          productno : data?.productno,
          itemgroupno:data?.itemgroupno
        });
        this.categories.value.productno = data;
        this.loader.stop();
      },(err)=>{
        console.log(err);
        this.loader.stop();
      });
    }
  }

  getitemgroups()
  {
    this.loader.start();
    this.dataService.getItemGroup().subscribe((res: any) =>{
      
        this.groupTypes = [...res];
        this.loader.stop();
      
    },(err)=>{
      console.log(err);
      this.loader.stop();
    });
  }
  create() {
    if(this.categories.valid) {
      this.categories.value.authenticationtoken = localStorage.getItem('authtoken')
      this.loader.start();
      if (this.edit) {
        this.dataService.addoreditCategory(this.categories.value).subscribe((res:any)=>{
          console.log(res);
          this.loader.stop();
          if(res.errorstatusno == 1)
          {
            this.router.navigate(['productcategory']);
            this.toastr.success(' Category Updated Successfully');
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
        this.dataService.addoreditCategory(this.categories.value).subscribe((res:any)=>{
          console.log(res);
          this.loader.stop();
          if(res.errorstatusno == 1)
          {
            this.router.navigate(['productcategory']);
            this.toastr.success('New Category Added Successfully');
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
