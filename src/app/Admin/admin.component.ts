import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api-service.service';
import { NavService } from '../nav/nav.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
col:any[]=[];
userList:any;
  user: any;
  loggedType: any;
  currentTab:any;
  productList: any;
  displayProduct:boolean=false;
 

  productForm:FormGroup
  uniqueId:any;
  progress: { percentage: number } = { percentage: 0 }
  currentFileUpload: any;
  imageUrl: any;
  imageUrlOld: any;

  imagePreviewURL: any;
  displayPreview: boolean;
  constructor(private api:ApiService,private navService:NavService,private fb:FormBuilder) { }

  ngOnInit() {
    this.currentTab='userList'
this.col=[{field:'name',header:'Name'},
{field:'email',header:'Email'},
{field:'mobile',header:'Mobile'}]
this.user=this.api.currentUser();
this.loggedType=this.user.user.roles[0].name;
this.navService.setLoginType(this.loggedType);  /// we set login type [admin]/[user]  so with this we change subject behavier and change navbar

this.imageUrl='assets/img/noimage.png'
this.productForm= this.fb.group({

  productid:[''],
  description:['',Validators.required],
  productname:['',Validators.required],
  price:['',Validators.required],
  qty:['',Validators.required],
  tags:[[]]

})
    this.getUserList()
  }
  getUserList(){
this.api.getActiveUser().subscribe(s=>{
  this.userList=s.data.userList
  console.log(this.userList)
})
  }
  showTab(e,tab){
    this.currentTab=tab;
    console.log(e,tab)
    if(this.currentTab=='productList'){
      this.getProductList()
    }
  }

  getProductList(){
    this.api.getProduct().subscribe(p=>{
      this.productList=p.data.data
      
      this.productList.map(m=>{
        m.imagePath= environment.IMG_PATH+m.uniqueId
   // this.api.getImageByUniqueId(m.uniqueId).subscribe(s=>{
    //  console.log(s);
    //  let sanitizedUrl = this.domSanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(s));
     // console.log(sanitizedUrl.changingThisBreaksApplicationSecurity,"sanitizeurl")
   
   // })
    })

    console.log("products",this.productList);
  })
    
  }
  updateProduct(product){
    this.displayProduct=true;
    console.log(product)

    this.imageUrlOld=product.imagePath
    this.uniqueId=product.uniqueId
    let obj={
      productid:product.productid,description:product.description,
      productname:product.productname,price:product.price,qty:product.qty,tags:product.tags
    }
    this.productForm.setValue(obj);
  }
  deleteProduct(product){
    console.log(product)
  }
  imagePreview(e){
    console.log("preview image",e)
this.imagePreviewURL=e
this.displayPreview=true;
  }
  onSubmit(value){
    
    value.uniqueId=this.uniqueId
    console.log(value,"saved data")
    this.api.addProduct(value).subscribe(s=>{console.log("s")})

}
handleFileInput(event){
  this.progress.percentage = 0;
  this.currentFileUpload =  event.item(0)
console.log("this is current file",this.currentFileUpload)
  let extension=this.currentFileUpload.name.split('.').pop(); 
  console.log("this is extension file",extension)
  this.uniqueId=new Date().getTime().toString()+"."+extension
  
  var reader = new FileReader();
  reader.onload = (event: any) => {
    this.imageUrl = event.target.result;
  }
  reader.readAsDataURL(this.currentFileUpload);
  
  this.api.addImage(this.currentFileUpload,this.uniqueId).subscribe(event => {
    if (event.type === HttpEventType.UploadProgress) {
      this.progress.percentage = Math.round(100 * event.loaded / event.total);
    } else if (event instanceof HttpResponse) {
      console.log('File is completely uploaded!');
    }
  })
}
}
