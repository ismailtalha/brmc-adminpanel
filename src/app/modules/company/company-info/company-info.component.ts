import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl,  FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css']
})
export class CompanyInfoComponent implements OnInit {
  imageurl: string;
  imageUrl: string;
  url : any;
  urll: string;
  constructor(private dataService: DataService, private loader: NgxUiLoaderService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }

    company = new FormGroup({
      companyno: new FormControl(null),
      companyname: new FormControl({value:null,disabled: true}),
      currency: new FormControl(null),
      country: new FormControl(null),
      adres: new FormControl(null),
      email: new FormControl(null, Validators.email),
      contact: new FormControl(null),
      website: new FormControl(null),
      fax: new FormControl(null),
      companydescription: new FormControl(null),
      ourworks: new FormControl(null),
      ourexperience: new FormControl(null),
      logo:new FormControl(null)
      
    });
    
    onSelectFile(event) {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
  
        reader.readAsDataURL(event.target.files[0]); // read file as data url
        
        reader.onload = (event) => { // called once readAsDataURL is completed
          this.url = event.target.result;
          this.company.value.logo = this.url;
          console.log('object',this.company.value.logo)
        }
      }
    }
    public delete(){
      this.url = null;
    }
    
  ngOnInit(): void {
      this.loader.start();
      this.dataService.getCompany().subscribe((res: any)=>{
        debugger
        var data = res[0];

         this.url = 'data:image/jpg;base64,'+ data.logo;
         this.company.patchValue(data);
         this.loader.stop();
       
        
      }, (err) => {
        console.log(err);
        this.loader.stop();
      });
    
  }
 
  OnUpdate()
  {
    if(this.company.valid) {
      this.loader.start();
        this.dataService.UpdateCompany(this.company.value).subscribe((res)=>{
          this.loader.stop();
          this.toastr.success(' Company Updated Successfully');
        },(err)=>{
          console.log(err);
          this.toastr.error(err, "Error");
          this.loader.stop();
        });
      
    } else {
      this.toastr.error("Please Fill all fields", "Error");
    }
  }
  

}
