import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from 'src/app/services/data.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { GetDataService } from 'src/app/services/getdata.service';

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
  url: string;
  constructor(private router: Router, private cookies: CookieService,
    private dataService: DataService,
    private loader: NgxUiLoaderService,
    private toastr: ToastrService,private getdata : GetDataService) { }

  ngOnInit(): void {
  }
  login() {

    this.loader.start();
    debugger
    this.dataService.getsingleuser(this.form.value.Name).subscribe((res: any) => {
      if (res?.password === this.form.value.Password) {
        // this.cookies.set('token', res?.token);

        this.getCompanyinfo();
        localStorage.setItem('userName', res?.userno);
        localStorage.setItem('id', res?.id);
        localStorage.setItem('userAccountId', res?.AccountId);
        localStorage.setItem('authtoken', res?.authenticationtoken)
        this.router.navigate(['dashboard']);
        this.loader.stop();
        this.toastr.success('Login Successfully', 'Success');
      } else {
        this.toastr.error("Wrong User", "Error");
        this.loader.stop();
      }
    }, (err) => {
      this.toastr.error("Wrong User", "Error");
      this.loader.stop();
    });
  }

  getCompanyinfo() {
    this.loader.start();
    this.dataService.getCompany().subscribe((res: any) => {
      debugger
      var data = res[0];

      data.logo = 'data:image/jpg;base64,' + data.logo;
      this.getdata.companydata = data;
      localStorage.setItem('company',JSON.stringify(data) )
      this.loader.stop();


    }, (err) => {
      console.log(err);
      this.loader.stop();
    });
  }

}
