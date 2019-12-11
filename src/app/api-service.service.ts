import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getProduct():Observable<any>{

return this.http.get('getProductList');
    
  }
  
  addToCart(product,email){
    return this.http.post<any>(`addToCart?email=${email}&prodId=${product}`,'');
  }
  currentUser(){
    return JSON.parse(localStorage.getItem('currentuser'));
  }

  getCartItems(email):Observable<any>{
    return this.http.get(`viewCart?email=${email}`);
  }
  updateCart(bufcartid,qty,email){
    return this.http.put(`updateCart?bufcartid=${bufcartid}&qty=${qty}&email=${email}`,'')
  }

  getCartCount(email){
    return this.http.get<any>(`viewCartBadge?email=${email}`);
  }

  getActiveUser(){
    return this.http.get<any>('auth/getUserList');
  }
}
