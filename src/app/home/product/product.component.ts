import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ApiService } from 'src/app/api-service.service';
import { CompileShallowModuleMetadata } from '@angular/compiler';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() public product;
  @Input() public loggedType;


  @Output() productAddToCart: EventEmitter<any> = new EventEmitter<any>();
  @Output() usergotoLogIn: EventEmitter<any> = new EventEmitter<any>();
  display: boolean=false;
  constructor(private api:ApiService) { }

  ngOnInit() {
  }

  addToCart() {

    this.productAddToCart.emit(this.product);

 //   console.log(user.user.email,"user");
  }
  gotoLogIn(){
    this.usergotoLogIn.emit(true);
    
  
  }
}
