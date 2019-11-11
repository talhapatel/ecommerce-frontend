import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api-service.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registrationForm:FormGroup;

  constructor(private _apiService:ApiService,private _router:Router,private _formBuilder:FormBuilder,private _registerService:RegisterService) { }

  ngOnInit() {

    this.createForm();
  }
  createForm(){

    this.registrationForm =this._formBuilder.group(
      {
        
  email: ['',Validators.required],
  name: [''],
  password: ['',Validators.required],
  
  username: ['',Validators.required]
      }
    )
  }

  register(values){
    values.role=['user']
    console.log("values",values)
    localStorage.clear();
    this._registerService.addUser(values).subscribe(s=>{
      console.log(s);
    })

  }

}
