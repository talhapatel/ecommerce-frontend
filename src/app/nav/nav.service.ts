import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavService {
   isLogin = new Subject<boolean>();

   cartBadge= new Subject<number>();

 
   cartBadge$ = this.cartBadge.asObservable();
  
 
 
 
  setLogin(value){
    this.isLogin.next(value);
  }
  getLogin(){
    return this.isLogin.asObservable();
  }

  setcartBadge(value){
    this.cartBadge.next(value);
  }
  getcartBadge(){
    return this.cartBadge.asObservable();
  }

 
}