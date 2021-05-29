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
      this.dataService.logout(this.userName).subscribe((res: any) =>{
        if(res?.errorrstatusno == 1) {
         // this.cookies.set('token', res?.token);
        this.cookies.deleteAll();
        localStorage.clear();
        this.router.navigate(['auth']);
          
          this.toastr.success('Logout Successfully', 'Success');
        } else {
          this.toastr.error(res?.errortext, "Error");
          //show some error from errotext from api
          
        }
      }, (err) =>{
          this.toastr.error(err.Message, "Error");

          
      }); 
    

    
  }



}
