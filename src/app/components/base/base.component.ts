import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

  constructor() { }
  @Input() datas:any;
  
  ngOnInit(): void {
    console.log("sadas",this.datas)
  }
}
