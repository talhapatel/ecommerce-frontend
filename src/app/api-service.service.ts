import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getProduct():Observable<any>{

return this.http.get('getProductList');
    
  }

  searchProductByTagName(tag):Observable<any>{
    return this.http.get(`getProductListByTags/${tag}`);
  }

  addProduct(product){
    return this.http.post<any>('addProduct',product);
  }

  addImage(file: File,uniqueId): Observable<HttpEvent<{}>> {
      let formdata: FormData = new FormData();
  
   let extension=file.name.split('.').pop(); 
      formdata.append('file', file);
      formdata.append('uniqueId',uniqueId);
   
      const req = new HttpRequest('POST', 'files/post', formdata, {
        reportProgress: true,
        responseType: 'text'
      });
   
      return this.http.request(req);
    }

    getImageByUniqueId(uniqueId){
   
      return this.http.get(`files/${uniqueId}`,{ responseType: 'blob' });
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

  getOrderList(){
    return this.http.get<any>('orderPlace/getOrders');
  }
  updateOrders(order){
    const formData: FormData = new FormData();
    formData.append("orderId", order.orderId);
    formData.append("orderStatus", order.orderStatus);
    return this.http.post('orderPlace/updateOrders',formData)
  }

  placeOrder(email){
return this.http.post(`orderPlace/placeOrder?email=${email}`,null);
  }
}
