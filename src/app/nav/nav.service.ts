import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavService {
   isLogin = new Subject<boolean>();

   loginType = new Subject<string>();

   cartBadge= new Subject<number>();

 
   cartBadge$ = this.cartBadge.asObservable();
   loginType$= this.loginType.asObservable();
  
 
 
 
  setLogin(value){
    this.isLogin.next(value);
  }
  getLogin(){
    return this.isLogin.asObservable();
  }
 
  setLoginType(value){
    this.loginType.next(value);
  }
  getLoginType(){
    return this.loginType.asObservable();
  }

  setcartBadge(value){
    this.cartBadge.next(value);
  }
  getcartBadge(){
    return this.cartBadge.asObservable();
  }

 
}