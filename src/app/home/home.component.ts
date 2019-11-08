import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products:any[]=[];

  constructor(private api:ApiService) { }

  ngOnInit() {


this.getProduct();
  }
getProduct(){

  this.api.getProduct().subscribe(p=>{
    console.log(p);
    this.products=p.data.data
  })
}
}
