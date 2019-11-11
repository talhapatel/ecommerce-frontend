import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  addToCart(product,email){
    return this.http.get(`http://localhost:8080/addTocart?email=${email}&productid=${product}`);
  }
}
