import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
col:any[]=[];
userList:any;
  constructor(private api:ApiService) { }

  ngOnInit() {
this.col=[{field:'name',header:'Name'},
{field:'email',header:'Email'},
{field:'mobile',header:'Mobile'}]


    this.getUserList()
  }
  getUserList(){
this.api.getActiveUser().subscribe(s=>{
  this.userList=s.data.userList
  console.log(this.userList)
})
  }

}
