import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api-service.service';
import { NavService } from '../nav/nav.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products:any[]=[];
user:any;
  constructor(private api:ApiService,private nav:NavService) { }

  ngOnInit() {
this.user=this.api.currentUser();
this.getCount(this.user.user.email);
this.getProduct();
  }
  getCount(email){
    this.api.getCartCount(email).subscribe(s=>{ 
      let count=s.data.cart
      this.nav.setcartBadge(count);
    })
  }
getProduct(){

  this.api.getProduct().subscribe(p=>{
    console.log(p);
    this.products=p.data.data
  })
}
addToCart(e) {
 
  var user=this.api.currentUser();
this.api.addToCart(e.productid,user.user.email).subscribe(c=>{
  console.log("add to cart",c)
  this.nav.setcartBadge(c.data.count);
console.log("add successfully")
});
}
}
