import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ApiService } from 'src/app/api-service.service';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() public product;

  @Output() productAddToCart: EventEmitter<any> = new EventEmitter<any>();
  constructor(private api:ApiService,private productService:ProductService) { }

  ngOnInit() {
  }

  addToCart() {

    this.productAddToCart.emit(this.product);
    console.log("product",this.product)
    var user=this.api.currentUser();
this.productService.addToCart(this.product.id,user.user.email);
    console.log(user.user.email,"user");
  }
}
