import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() public product;

  @Output() productAddToCart: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  addToCart() {
    this.productAddToCart.emit(this.product);
  }
}
