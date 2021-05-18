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
    
    this.loader.start();
    debugger
    this.dataService.getsingleuser(this.form.value.Name).subscribe((res: any) =>{
      if(res?.password === this.form.value.Password) {
       // this.cookies.set('token', res?.token);
        localStorage.setItem('userName', res?.userno);
        localStorage.setItem('id', res?.id);
        localStorage.setItem('userAccountId', res?.AccountId);
        localStorage.setItem('authtoken',res?.authenticationtoken)
        this.router.navigate(['dashboard']);
        this.loader.stop();
        this.toastr.success('Login Successfully', 'Success');
      } else {
        this.toastr.error("Wrong User", "Error");
        this.loader.stop();
      }
    }, (err) =>{
        this.toastr.error("Wrong User", "Error");
        this.loader.stop();
    }); 
  }

}
