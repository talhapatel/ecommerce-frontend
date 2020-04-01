import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../api-service.service';
import { NavService } from '../nav/nav.service';
import {DomSanitizer} from '@angular/platform-browser';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 
  products:any;
user:any;
  loggedType: any="CUSTOMER";
  display: any;
  keyword: any;
  constructor(private api:ApiService,private nav:NavService,private domSanitizer:DomSanitizer,private navService:NavService,private rout:Router,private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.getProduct();
this.user=this.api.currentUser();
if(this.user){
  this.getCount(this.user.user.email);
  
  this.user=this.api.currentUser();
  this.loggedType=this.user.user.roles[0].name;
  
}
this.navService.setLoginType(this.loggedType);
  }
  getCount(email){
    this.api.getCartCount(email).subscribe(s=>{ 
      let count=s.data.cart
      this.nav.setcartBadge(count);
    })
  }
getProduct(){

  this.api.getProduct().subscribe(p=>{
  
    this.products=p.data.data

    this.products.map(m=>{
    //this.api.getImageByUniqueId(m.uniqueId).subscribe(s=>{
    //  console.log(s);
    //  let sanitizedUrl = this.domSanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(s));
     // console.log(sanitizedUrl.changingThisBreaksApplicationSecurity,"sanitizeurl")
   
      m.imagePath= environment.IMG_PATH+m.uniqueId
   // })
    })
this.getProduct();
    console.log("products",this.products);
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
gotoLogIn(e){
  this.confirmationService.confirm({
      message: 'For This Process You Have to Login first so press "Yes" to login?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.rout.navigate(['/login']);
      },
      reject: () => {
         
      }
  });


}



public searchInterest() {
  let wordSearch = this.keyword;
  setTimeout(() => {
      if (wordSearch == this.keyword) {
          if (this.keyword) {
              //console.log(this.keyword)
            this.api.searchProductByTagName(this.keyword).subscribe(p=>{
              this.products=p.data.data

              this.products.map(m=>{
              this.api.getImageByUniqueId(m.uniqueId).subscribe(s=>{
              //  console.log(s);
              //  let sanitizedUrl = this.domSanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(s));
               // console.log(sanitizedUrl.changingThisBreaksApplicationSecurity,"sanitizeurl")
             
                m.imagePath= window.URL.createObjectURL(s)
              })
              })
            })


          }else{
              //code here
              this.getProduct();
          }
      }
  }, 1000);
}
public sanitizeImage(image: string) {
  return this.domSanitizer.bypassSecurityTrustStyle(`url(${image})`);
}
}
