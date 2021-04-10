import { Component, OnInit, HostListener, Output } from '@angular/core';
import { FormControl,  FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  users = new FormGroup({
    username: new FormControl(null, Validators.required),
    userno : new FormControl(null,Validators.required),
    password: new FormControl(null, Validators.required),
    usertype: new FormControl('admin', Validators.required)
  });
  edit: any;
  
  constructor(private dataService: DataService, private loader: NgxUiLoaderService, 
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    debugger
    if(this.route.snapshot.params.id) {
      this.edit = this.route.snapshot.params.id;
      let id = this.route.snapshot.params.id;
      this.loader.start();
      this.dataService.getsingleuser(id).subscribe((res: any)=>{
        let data = res;
        this.users.patchValue(data);
        this.loader.stop();
      },(err)=>{
        console.log(err);
        this.loader.stop();
      });
    }
  }
  // @HostListener('document:keyup', ['$event'])
  //   onKeyUp (event: KeyboardEvent) {
  //     if (event.keyCode == 18) {
  //       this.create();
  //       event.preventDefault();
  //     }
  //   }
  create() {
    if(this.users.valid) {
      this.loader.start();
        this.dataService.createUser(this.users.value).subscribe((res)=>{
          console.log(res);
          this.loader.stop();
          this.router.navigate(['users']);
          this.toastr.success('New User Added Successfully');
        },(err)=>{
          console.log(err);
          this.toastr.error(err, "Error");
          this.loader.stop();
        });
      }
  }

}
