import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
col:any[]=[];
  constructor() { }

  ngOnInit() {
this.col=[{field:'name',header:'Name'},
{field:'email',header:'Email'},
{field:'mobile',header:'Mobile'}]

  }

}
