import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import { DataService } from 'src/app/services/data.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') form;
  email: any;
  password: any;
  rememberMe: boolean = false;
  constructor(private router: Router, private cookies: CookieService,
     private dataService: DataService,
     private loader: NgxUiLoaderService,
     private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  login() {
    this.router.navigate(['dashboard']);
    // this.loader.start();
    // this.dataService.getsinglecustomer(this.form.value).subscribe((res: any) =>{
    //   if(res?.code === 200) {
    //    // this.cookies.set('token', res?.token);
    //     localStorage.setItem('userName', res?.data[0].Username);
    //     localStorage.setItem('id', res?.data[0].id);
    //     localStorage.setItem('userAccountId', res?.data[0].AccountId);
    //     this.router.navigate(['dashboard']);
    //     this.loader.stop();
    //     this.toastr.success('Login Successfully', 'Success');
    //   } else {
    //     this.toastr.error("Wrong User", "Error");
    //     this.loader.stop();
    //   }
    // }, (err) =>{
    //     this.toastr.error("Wrong User", "Error");
    //     this.loader.stop();
    // }); 
  }

}
