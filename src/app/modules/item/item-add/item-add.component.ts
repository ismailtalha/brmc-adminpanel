import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ActivatedRoute, Router } from '@angular/router';
import { GalleriaThumbnails } from 'primeng';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.css']
})
export class ItemAddComponent implements OnInit {
  unitdetails: any=[];
  edit: 0;
  url: string | ArrayBuffer;

  constructor(private dataService: DataService,
    private loader: NgxUiLoaderService,
    private router: Router,private toastr: ToastrService,private route: ActivatedRoute) { }
categories:any=[];
brands:any=[];
itemgroups:any=[];
units:any=[];
baseunits:any=[];
  ngOnInit(): void {
    if(this.route.snapshot.params.id) {
      this.edit = this.route.snapshot.params.id;
      let id = this.route.snapshot.params.id;
      this.loader.start();
      this.dataService.getItemById(id).subscribe((res: any)=>{
        debugger;
        let data = res;
        
        this.itemform.patchValue(data);
        this.url = 'data:image/jpeg;base64,'+data.itemimagelogo;
        this.unitdetail.patchValue(data.itemunitsdetails)
        this.unitdetails = data.itemunitsdetails;
        this.loader.stop();
      },(err)=>{
        console.log(err);
        this.loader.stop();
      });
    }
    
    this.getalldropdowns();
  }
  itemform = new FormGroup({
    productno: new FormControl(null),
    productname:new FormControl(null, Validators.required),
    itemgroupno: new FormControl(null),
    itemgroupname:new FormControl(null, Validators.required),
    makeno:new FormControl(null),
    makename:new FormControl(null, Validators.required),
    saleprice:new FormControl(null, Validators.required),
    costprice:new FormControl(null, Validators.required),
    itemname:new FormControl(null, Validators.required),
    itembarcode:new FormControl(null),
    reorderlevel:new FormControl(null),
    baseunitno:new FormControl(null),
    baseunitname:new FormControl(null),
    itemstock:new FormControl(null),
    discountpercentage:new FormControl(null),
    isfeatured:new FormControl(null),
    isnewarrival:new FormControl(null),
    blockitem:new FormControl(null),
    itemdetails:new FormControl(null),
    itemunitsdetails:new FormControl(null),
    itemno: new FormControl(null),
    rowno:new FormControl(null),
    itemimagelogo:new FormControl(null),
    authenticationtoken:new FormControl(null),
    createdate:new FormControl()
  
  });
  unitdetail = new FormGroup({
    factorunit:new FormControl(null),
    factorunitname: new FormControl(null, Validators.required),
    equivalent:new FormControl(null),
    dsaleprice: new FormControl(null),
    dcostprice:new FormControl(null),
    ltxt:new FormControl(null),
    itemno: new FormControl(null),
    unitname: new FormControl(null),
    itemunitstock: new FormControl(null),
    rowno:new FormControl(null),
    authenticationtoken:new FormControl(null)
  
  });
  getalldropdowns()
  {
    this.loader.start();
   let categories = this.dataService.getCategories();
    let brands = this.dataService.getBrands();
    let itemgroups = this.dataService.getItemGroup();
    let units = this.dataService.getUnits();
    let baseunits = this.dataService.getUnits();
    forkJoin([categories, itemgroups, brands,units,baseunits]).subscribe(([catres, itemgroupres, resbrands,resunits,resbaseunits]) => {
      this.categories = catres;
      this.brands = resbrands;
      this.itemgroups = itemgroupres;
      this.units = resunits;
      this.baseunits = resbaseunits;
      this.loader.stop();
    }), (error) => {
      console.log(error);
      this.toastr.show(error, "Error Messege");
      this.toastr.error("error", "Database Connectivity")
      this.loader.stop();
    }
  }
  


  add() {
    this.unitdetails.push(this.unitdetail.value);
    this.unitdetail.reset();
  }

  onEdit(value) {
    
    this.unitdetail.patchValue({
      factorunit: value.factorunit,
      factorunitname:value.factorunitname,
      equivalent:value.equivalent,
      dsaleprice: value.dsaleprice,
      dcostprice:value.dcostprice,
      ltxt:value.ltxt,
      unitname:value.factorunitname,
      itemno:value.itemno,
      itemunitstock:value.itemunitstock,
      rowno:value.rowno
    });
  
    const index = this.unitdetails.indexOf(value);
    this.unitdetails.splice(index, 1);

  }

  onDelete(value) {
    const index = this.unitdetails.indexOf(value);
    this.unitdetails.splice(index, 1);
  }

  onSave() {
    debugger
    if (this.itemform.valid && this.unitdetails.length > 0) {
      this.itemform.value.authenticationtoken = localStorage.getItem('authtoken')
      const payload = {
        itemform: this.itemform.value,
        unitdetails: this.unitdetails
      };
      payload.itemform.itemunitsdetails = this.unitdetails;
      this.loader.start();
      if (this.edit) {
        this.dataService.addoreditItem(payload.itemform).subscribe((res: any) => {
          this.loader.stop();
          if(res.errorstatusno == 1)
          {
            this.router.navigate(['item']);
            this.toastr.success('Item Updated Successfully');
          }
          else
          {
            this.toastr.warning(res.errortext);
          }
          
        
        }, (err) =>  {
          this.loader.stop();
        });
      } else {

        this.dataService.addoreditItem(payload.itemform).subscribe((res: any) => {
          this.loader.stop();
          debugger
          if(res.errorstatusno == 1)
          {
            this.router.navigate(['item']);
            this.toastr.success('New Item Added Successfully');
          }
          else
          {
            this.toastr.warning(res.errortext);
          }
         
        
        }, (err) =>  {
          this.loader.stop();
        });
      }
    } else {
      this.toastr.error('Please Fill all fields', 'Error');
    }
  }
  onUnitChange(value)
  {
    
    this.unitdetail.patchValue({
      factorunit : value?.unitno,
      factorunitname:value?.unitname
    })
  }
  onBaseUnitChange(value)
  {    
    this.itemform.patchValue({
      baseunitno : value?.unitno
    })
  }
  
  onCategoryChange(value)
  {
    
    this.itemform.patchValue({
      productno : value?.productno
    })
  }
  
  onItemGroupChange(value)
  {
    
    this.itemform.patchValue({
      itemgroupno : value?.itemgroupno
    })
  }
  onBrandChange(value)
  {
    
    this.itemform.patchValue({
      makeno : value?.makeno
    })
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      
      reader.onload = (event) => { // called once readAsDataURL is completed
        debugger
        this.url = event.target.result;
        this.itemform.patchValue({itemimagelogo : this.url.toString().replace('data:image/jpeg;base64,',"")})
      }
    }
  }
}
