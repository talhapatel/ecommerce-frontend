import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api-service.service';
import { NavService } from '../nav/nav.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
col:any[]=[];
userList:any;
  user: any;
  loggedType: any;
  constructor(private api:ApiService,private navService:NavService) { }

  ngOnInit() {
this.col=[{field:'name',header:'Name'},
{field:'email',header:'Email'},
{field:'mobile',header:'Mobile'}]
this.user=this.api.currentUser();
this.loggedType=this.user.user.roles[0].name;
this.navService.setLoginType(this.loggedType);  /// we set login type [admin]/[user]  so with this we change subject behavier and change navbar

    this.getUserList()
  }
  getUserList(){
this.api.getActiveUser().subscribe(s=>{
  this.userList=s.data.userList
  console.log(this.userList)
})
  }

}
