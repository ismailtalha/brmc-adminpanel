import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import { DataService } from 'src/app/services/data.service';
import { ConnectionService } from 'ng-connection-service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  date = new Date();
  userName = (localStorage.getItem('userName')) ? localStorage.getItem('userName').toUpperCase() : 'Admin';
  isConnected: boolean;
  noInternetConnection: boolean;
  constructor(location: Location,  private element: ElementRef, private router: Router, private cookies: CookieService, private dataService: DataService,
    private toastr: ToastrService
    ) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

  logout() {

      debugger

      let userNo = localStorage.getItem('userName');
      if(userNo == null)
      {
        this.toastr.error('It seems as your session has expired, you need to login again');
        this.router.navigate(['auth']);
      }
    let data = {"userno": userNo};
    this.dataService.logout(data).subscribe((data:any)=>{
      debugger
      if(data.errorstatusno == "1")
      {
        this.cookies.deleteAll();
        localStorage.clear();        
        this.router.navigate(['auth']);
      this.toastr.success("Successfully Logout");
      }
      else
{
  this.toastr.error(data.errotext);
  

}
    })

    // this.cookies.deleteAll();
    // localStorage.clear();
    // this.router.navigate(['auth']);
    

    
  }



}
