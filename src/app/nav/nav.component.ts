import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api-service.service';
import { AuthenticationService } from '../_authService/authentication.service';
import { Router } from '@angular/router';
import { NavService } from './nav.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

 // @Input() public loggedType:string;
  //currentUser:Subject<boolean>;
badge:number;
  badgeCountsubscription: Subscription;
  user:any;
  loggedType: string;
 // loggedType:string;
  constructor(private _apiService:ApiService,private _authService:AuthenticationService,private router:Router,private navService:NavService) { 
    this.navService.cartBadge$.subscribe(s=>{
      this.badge=s;
      console.log(s,"nav");
    })
    this.user=this._apiService.currentUser();

    this.navService.loginType$.subscribe(s=>{
      this.loggedType=s;
      console.log(this.loggedType,"nav");
    })
   
  }

  ngOnInit() {
  
 
 /*    console.log("current user",this.user)
    setTimeout(() => {
      this.currentUser= this.navService.isLogin
    }, 1000); */
   
  //console.log(this.currentUser,"in nav bar")
  }
logout()
{
  this._authService.logout();
  this.navService.setcartBadge(0);
 
 // this.navService.setLogin(false);
  
  this.router.navigate(['/home']);

}
}
