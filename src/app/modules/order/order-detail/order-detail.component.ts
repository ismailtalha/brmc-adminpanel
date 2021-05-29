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
  selected:any;
  statusarr = [{'orderstatusno':'01' , 'orderstatusname' : "Pending"},
  {'orderstatusno':'02' , 'orderstatusname' : "Dispatched"},
  {'orderstatusno':'03' , 'orderstatusname' : "Delivered"},
  {'orderstatusno':'04' , 'orderstatusname' : "Invoiced"},
  {'orderstatusno':'05' , 'orderstatusname' : "Closed"}]
  constructor(private dataService: DataService,
    private loader: NgxUiLoaderService,
    private router: Router,private toastr: ToastrService,private route: ActivatedRoute) { }
    orderform = new FormGroup({
      docno: new FormControl(),
      saleperson: new FormControl(),
      responsibleperson:new FormControl(),
      orderstatusno: new FormControl(),
      plantno: new FormControl(),
      custno:new FormControl(),
      contactperson: new FormControl(),
      contactpersoncellno: new FormControl(),
      deliveryaddress:new FormControl(),
      description: new FormControl(),
      currency: new FormControl(),
      erate:new FormControl(),
      paymentmethode: new FormControl(),
      paymentterm: new FormControl(),
      totalamount:new FormControl(),
      totaldiscount: new FormControl(),
      totalgst: new FormControl(),
      freightcharges:new FormControl(),
      totalnetamount: new FormControl(),
      deliverylocation: new FormControl(),
      orderstatusname:new FormControl(),
      custname: new FormControl(),
      custtype: new FormControl(),
      custgroupno:new FormControl(),
      custgroupname:new FormControl(),
      area: new FormControl(),
      address: new FormControl(),
      rowno:new FormControl(null),
      sldsaleorderdtls:new FormControl(),
      selected:new FormControl()
      
    
    });
    orderdetail = new FormGroup({
      itemno: new FormControl(),
      baseunitno: new FormControl(),
      factorno:new FormControl(),
      equivalent: new FormControl(),
      quantity: new FormControl(),
      price:new FormControl(),
      amount:new FormControl(),
      discount: new FormControl(),
      gst: new FormControl(),
      netamount:new FormControl(),
      ltxt: new FormControl(),
      itemdimensionno: new FormControl(),
      itemdimensiontype:new FormControl(),
      itemname: new FormControl(),
      unitname: new FormControl(),
      makename:new FormControl(),
      productname: new FormControl(),
      itemgroupname:new FormControl(),
      rowno:new FormControl(null),
    
    });


  ngOnInit(): void {
    
    if(this.route.snapshot.params.id) {
      this.edit = this.route.snapshot.params.id;
      let id = this.route.snapshot.params.id;
      this.loader.start();
      this.dataService.getOrderById(id).subscribe((res: any)=>{
        debugger;
        let data = res;
        
        this.orderform.patchValue(data);
        // this.orderdetail.patchValue(data.sldsaleorderdtls);
        this.orderform.value.selected = this.getstatus(data.orderstatusno)
        this.orderdetails=data.sldsaleorderdtls
        this.loader.stop();
      },(err)=>{
        console.log(err);
        this.loader.stop();
      });
    }
  }
  changestatus()
  {
    debugger

    this.dataService.createorder(this.orderform.value).subscribe((res:any) => {
      this.loader.stop();
      this.selected.orderstatusno = res.orderstatusno
      alert('done')
    })
   
  }
  getstatus(no)
{
 let value = this.statusarr.filter((sttaus) => sttaus.orderstatusno == no)
 return value[0];
}
}
