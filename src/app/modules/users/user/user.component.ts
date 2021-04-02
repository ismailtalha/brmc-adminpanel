import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { DboperationsComponent } from 'src/app/dboperations/dboperations.component';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent  {
  userRecords: any = {
    data: [],
    cols: [
      { field: 'docno', header: 'Doc no' },
      { field: 'userno', header: 'User no' },
      { field: 'username', header: 'UserName' },
      { field: 'password', header: 'Password' },
      { field: 'usertype', header: 'User Type' },
      
    ],
    first: 0,
    rows: 60,
    approvedTotalRows: 0,
    columns: [],
  };
  constructor(private dataService: DataService,
    private loader: NgxUiLoaderService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.loader.start();
    this.dataService.getUsers().subscribe((res: any) =>{
      
        this.userRecords.data = [...res];
        this.loader.stop();
      
    },(err)=>{
      console.log(err);
      this.loader.stop();
    });
  }

  onEdit(data) {
    this.router.navigate(['/users/edit-user', data?.id]);
  }

  onDelete(data) {
    var r = confirm("Are Your Sure Your Want to delete?");
    if (r === true) {
      this.loader.start();
    this.dataService.deleteUser(data?.id).subscribe((res: any) =>{
     console.log(res);
     this.loader.stop();
     this.ngOnInit();
    },(err)=>{
      this.loader.stop();
    });
    }
  }

}
