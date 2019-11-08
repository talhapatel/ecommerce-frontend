import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api-service.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private registrationForm:any;

  constructor(private _apiService:ApiService,private _router:Router,private _formBuilder:FormBuilder) { }

  ngOnInit() {

    this.createForm();
  }
  createForm(){

    this.registrationForm=this._formBuilder.group(
      {
        
      }
    )
  }

}
