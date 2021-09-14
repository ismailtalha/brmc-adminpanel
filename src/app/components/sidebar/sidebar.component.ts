import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from 'src/app/services/data.service';
import { GetDataService } from 'src/app/services/getdata.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/users', title: 'Users', icon: 'fas fa-users text-primary', class: '' },
  { path: '/currencies', title: 'Currencies', icon: 'ni ni-money-coins text-primary', class: '' },
  { path: '/customers', title: 'Customers', icon: 'ni ni-single-02 text-primary', class: '' },
  { path: '/payment', title: 'Transaction', icon: 'ni ni-single-02 text-primary', class: '' },
  { path: '/accounts', title: 'GL-Accounts', icon: 'ni ni-single-copy-04 text-primary', class: '' },
  { path: '/sales', title: 'Sales', icon: 'fas fa-chart-pie text-primary', class: '' },
  { path: '/purchase', title: 'Purchase', icon: 'ni-bullet-list-67 text-primary', class: '' },
  { path: '/reports', title: 'Stock Report', icon: 'ni ni-money-coins text-primary', class: '' },
  { path: '/reports/journal-report', title: 'Journal Report', icon: 'ni ni-money-coins text-primary', class: '' },
  { path: '/reports/ledger-report', title: 'Cash Ledger Report', icon: 'ni ni-money-coins text-primary', class: '' },
  { path: '/reports/customer-ledger-report', title: 'Customer Ledger Report', icon: 'ni ni-money-coins text-primary', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router, private cookies: CookieService, private dataService: DataService,public getdata : GetDataService) {
    
  }

  call() {
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    }
  }
  ngOnInit() {
    this.call();
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
    let company = JSON.parse(localStorage.getItem('company')) 
    this.getdata.companydata = company;
  }

  logout() {
    this.cookies.deleteAll();
    localStorage.clear();
    this.router.navigate(['auth']);
  }
}
