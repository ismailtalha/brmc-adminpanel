import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl,  FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { GetDataService } from 'src/app/services/getdata.service';
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
    private toastr: ToastrService , public getdata:GetDataService) { }

    company = new FormGroup({
      companyno: new FormControl(null),
      companyname: new FormControl(),
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
      logo:new FormControl(null),
      rowno:new FormControl(null),
      authenticationtoken:new FormControl(null)
      
    });
    
    onSelectFile(event) {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
  
        reader.readAsDataURL(event.target.files[0]); // read file as data url
        
        reader.onload = (event) => { // called once readAsDataURL is completed
          this.url = event.target.result;
          debugger;
          this.company.value.logo = this.url;
          //this.company.value.logo = 'data:image/jpg;base64,' + this.company.value.logo;
          this.getdata.companydata = this.company.value;
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

         //this.url = 'data:image/jpg;base64,'+ data.logo;
         this.url = 'data:image/jpeg;base64,'+ data.logo;
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
      this.company.value.authenticationtoken = localStorage.getItem('authtoken')
      this.loader.start();
debugger;
      //this.company.value.logo = this.company.value.logo.replace('data:image/jpeg;base64,',"");
        var replacestring = this.company.value.logo.toString().substring(0,this.company.value.logo.indexOf("base64,"));        
        this.company.value.logo = this.company.value.logo.replace(replacestring+'base64,',"");
        this.dataService.UpdateCompany(this.company.value).subscribe((res:any)=>{
          this.loader.stop();
          if(res.errorstatusno == 1)
          {
            this.toastr.success(' Company Updated Successfully');
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
      this.toastr.error("Please Fill all fields", "Error");
    }
  }
  

}
