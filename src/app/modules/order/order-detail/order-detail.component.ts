import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  edit: any;
  orderdetails: any = [];

  constructor(private dataService: DataService,
    private loader: NgxUiLoaderService,
    private router: Router,private toastr: ToastrService,private route: ActivatedRoute) { }
    orderform = new FormGroup({
      docno: new FormControl({value:null,disabled:true}),
      saleperson: new FormControl({value:null,disabled:true}),
      responsibleperson:new FormControl({value:null,disabled:true}),
      orderstatusno: new FormControl({value:null,disabled:true}),
      plantno: new FormControl({value:null,disabled:true}),
      custno:new FormControl({value:null,disabled:true}),
      contactperson: new FormControl({value:null,disabled:true}),
      contactpersoncellno: new FormControl({value:null,disabled:true}),
      deliveryaddress:new FormControl({value:null,disabled:true}),
      description: new FormControl({value:null,disabled:true}),
      currency: new FormControl({value:null,disabled:true}),
      erate:new FormControl({value:null,disabled:true}),
      paymentmethode: new FormControl({value:null,disabled:true}),
      paymentterm: new FormControl({value:null,disabled:true}),
      totalamount:new FormControl({value:null,disabled:true}),
      totaldiscount: new FormControl({value:null,disabled:true}),
      totalgst: new FormControl({value:null,disabled:true}),
      freightcharges:new FormControl({value:null,disabled:true}),
      totalnetamount: new FormControl({value:null,disabled:true}),
      deliverylocation: new FormControl({value:null,disabled:true}),
      orderstatusname:new FormControl({value:null,disabled:true}),
      custname: new FormControl({value:null,disabled:true}),
      custtype: new FormControl({value:null,disabled:true}),
      custgroupno:new FormControl({value:null,disabled:true}),
      custgroupname:new FormControl({value:null,disabled:true}),
      area: new FormControl({value:null,disabled:true}),
      address: new FormControl({value:null,disabled:true}),
      sldsaleorderdtls:new FormControl({value:null,disabled:true})
    
    });
    orderdetail = new FormGroup({
      itemno: new FormControl({value:null,disabled:true}),
      baseunitno: new FormControl({value:null,disabled:true}),
      factorno:new FormControl({value:null,disabled:true}),
      equivalent: new FormControl({value:null,disabled:true}),
      quantity: new FormControl({value:null,disabled:true}),
      price:new FormControl({value:null,disabled:true}),
      amount:new FormControl({value:null,disabled:true}),
      discount: new FormControl({value:null,disabled:true}),
      gst: new FormControl({value:null,disabled:true}),
      netamount:new FormControl({value:null,disabled:true}),
      ltxt: new FormControl({value:null,disabled:true}),
      itemdimensionno: new FormControl({value:null,disabled:true}),
      itemdimensiontype:new FormControl({value:null,disabled:true}),
      itemname: new FormControl({value:null,disabled:true}),
      unitname: new FormControl({value:null,disabled:true}),
      makename:new FormControl({value:null,disabled:true}),
      productname: new FormControl({value:null,disabled:true}),
      itemgroupname:new FormControl({value:null,disabled:true}),
    
    });


  ngOnInit(): void {
    
    if(this.route.snapshot.params.id) {
      this.edit = this.route.snapshot.params.id;
      let id = this.route.snapshot.params.id;
      this.loader.start();
      this.dataService.getOrderById(id).subscribe((res: any)=>{
        
        let data = res;
        
        this.orderform.patchValue(data);
        // this.orderdetail.patchValue(data.sldsaleorderdtls);
        this.orderdetails=data.sldsaleorderdtls
        this.loader.stop();
      },(err)=>{
        console.log(err);
        this.loader.stop();
      });
    }
  }

}
