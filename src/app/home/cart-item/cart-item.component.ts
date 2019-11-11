import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  cartlist: any[];
  totalSum: number = 0;
  subtotal:number=0;
  constructor(private api: ApiService, private route: Router) { }

  ngOnInit() {
  this.getCartList();
  }
  getCartList(){
    var user=this.api.currentUser();
    console.log("user",user)
        this.api.getCartItems(user.user.email).subscribe(res => {
          this.cartlist = res.data.cart;
          this.cartlist.forEach(value => {
            value.subtotal=value.quantity*value.price;
            this.totalSum = this.totalSum + (value.quantity * value.price);
          });
          console.log("cart",res)
        });
  }
  update(bufid,qty){
    var user=this.api.currentUser();
    this.totalSum=0;
    this.api.updateCart(bufid.value,qty.value,user.user.email).subscribe(c=>{
this.getCartList();
    })
  }
}
