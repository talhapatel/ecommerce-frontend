import { Component, OnInit } from '@angular/core';
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

  currentUser:Subject<boolean>;
badge:number;
  badgeCountsubscription: Subscription;
  user:any;
  constructor(private _apiService:ApiService,private _authService:AuthenticationService,private router:Router,private navService:NavService) { 
    this.navService.cartBadge$.subscribe(s=>{
      this.badge=s;
      console.log(s,"nav");
    })
  }

  ngOnInit() {
  
    this.user=this._apiService.currentUser();
    console.log("current user",this.user)
    setTimeout(() => {
      this.currentUser= this.navService.isLogin
    }, 1000);
   
  console.log(this.currentUser,"in nav bar")
  }
logout()
{
  this._authService.logout();
  this.navService.setcartBadge(0);
  this.navService.setLogin(false);
  this.router.navigate(['/login']);

}
}
