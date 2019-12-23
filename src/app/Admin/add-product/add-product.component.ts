import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  productForm:FormGroup
  uniqueId:any;
  progress: { percentage: number } = { percentage: 0 }
  currentFileUpload: any;
  imageUrl: any;
  constructor(private apiService:ApiService,private fb:FormBuilder) { }

  ngOnInit() {

   this.imageUrl='assets/img/noimage.png'
    this.productForm= this.fb.group({

      id:[''],
      description:['',Validators.required],
      productname:['',Validators.required],
      price:['',Validators.required],
      qty:['',Validators.required],
      tags:[[]]

    })

  }
  onSubmit(value){
    
      value.uniqueId=this.uniqueId
      console.log(value,"saved data")
      this.apiService.addProduct(value).subscribe(s=>{console.log("s")})

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
    
    this.apiService.addImage(this.currentFileUpload,this.uniqueId).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    })
  }
}
