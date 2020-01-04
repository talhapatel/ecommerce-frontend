import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api-service.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orderlist: any[] = [];
  constructor(private route: Router, private api: ApiService) { }

  ngOnInit() {

    this.getOrderList();
  }
getOrderList(){

  this.api.getOrderList().subscribe(res=>{
    this.orderlist=res.data.OrderList
    console.log("res",res)
  })
}
approve(orderid) {
  let order = {
    "orderId": orderid,
    "orderStatus": "Approved"
  }
  this.api.updateOrders(order).subscribe(res => {
    this.getOrderList();
  });
}

decline(orderid) {
  let order = {
    "orderId": orderid,
    "orderStatus": "Declined"
  }
  this.api.updateOrders( order).subscribe(res => {
    this.getOrderList();
  });
}
}
