import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl,  FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-new-customer',
  templateUrl: './add-new-customer.component.html',
  styleUrls: ['./add-new-customer.component.css']
})
export class AddNewCustomerComponent implements OnInit {
  customers = new FormGroup({
    custname: new FormControl(null, Validators.required),
    custno: new FormControl(null),
    email: new FormControl(null, Validators.email),
    contact: new FormControl(null),
    address: new FormControl(null),
    custtype: new FormControl(null) ,
    web: new FormControl(null),
    fax: new FormControl(null),
    block: new FormControl(null),
    ntnno: new FormControl(null) ,
    strnno: new FormControl(null),
    authenticationtoken:new FormControl(null)
  });
  edit: any;
  accounts: any;
  constructor(private dataService: DataService, private loader: NgxUiLoaderService, 
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }


  ngOnInit(): void {
    if(this.route.snapshot.params.id) {
      this.edit = this.route.snapshot.params.id;
      let id = this.route.snapshot.params.id;
      this.loader.start();
      this.dataService.getcustomerById(id).subscribe((res: any)=>{
        let data = res;
        this.customers.patchValue(data);
        this.loader.stop();
      },(err)=>{
        console.log(err);
        this.loader.stop();
      });
    }
  }

  setval()
  {
    let pass= Array(10).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');
    this.customers.patchValue({'custname':pass})
  }

  create() {
    if(this.customers.valid) {
      this.customers.value.authenticationtoken = localStorage.getItem('authtoken')
      this.loader.start();
      if (this.edit) {
        this.dataService.createcustomer(this.customers.value).subscribe((res:any)=>{
          console.log(res);
          this.loader.stop();
          if(res.errorstatusno == 1)
          {
            this.router.navigate(['customers']);
            this.toastr.success('Customers Updated Successfully');
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
        
         
          this.loader.stop();
          this.dataService.createcustomer(this.customers.value).subscribe((res)=>{
            console.log(res);
            this.loader.stop();
            this.router.navigate(['customers']);
            this.toastr.success('New Customers Added Successfully');
          },(err)=>{
            this.toastr.error(err, "Error");
          console.log(err);
          this.loader.stop();
        });
      }
      
    } else {
      this.toastr.error("Please Fill all fields", "Error");
    }
  }

}
