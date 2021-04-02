import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-permissions',
  templateUrl: './user-permissions.component.html',
  styleUrls: ['./user-permissions.component.css']
})
export class UserPermissionsComponent implements OnInit {
  users = [
    {
      name: 'Mohsin',
      permission: 0
    },
    {
      name: 'Ahmed',
      permission: 0
    },
    {
      name: 'Ali',
      permission: 0
    },
    {
      name: 'Ismail',
      permission: 0
    },
    {
      name: 'Moiz',
      permission: 0
    },
    {
      name: 'Fahad',
      permission: 0
    },
    {
      name: 'Faizan',
      permission: 0
    },
    {
      name: 'Usman',
      permission: 0
    }
  ];
  screens = ['Users', 'Currencies', 'Customers', 'Transaction', 'GL-Accounts', 'Sales', 'Purchase', 'Report'];

  constructor() { }

  ngOnInit(): void {
  }

}
