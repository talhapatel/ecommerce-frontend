import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../_authService/authentication.service';
import { first } from 'rxjs/operators';
import { NavService } from '../nav/nav.service';
import { ApiService } from '../api-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  loggedType:string;
  user:any;

  error = '';
 

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private navService:NavService,
      private _apiService:ApiService
  ) {
   
   }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]

      });
 
      // reset login status
      this.authenticationService.logout();

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
      this.authenticationService.login(this.f.username.value, this.f.password.value)
          .subscribe(
              res => {
                if (res.status == 'SUCCESS') {
                console.log("response login",res)
                 // store username and jwt token in local storage to keep user logged in between page refreshes
                 localStorage.setItem('token', res.data.token);
                 localStorage.setItem('currentuser', JSON.stringify({ user: res.data.user }));
                 this.user=this._apiService.currentUser();
                 this.loggedType=this.user.user.roles[0].name;
                 this.navService.setLoginType(this.loggedType);
                 console.log("loggedType",this.loggedType)
                 this.navService.setLogin(true);
                 if(this.loggedType=='ROLE_USER'){
                   this.router.navigate(['home']);}
                   else if(this.loggedType=='ROLE_ADMIN'){
                     this.router.navigate(['admin']);
                   }else{
                     this.router.navigate(['']);
                   }
               
                  console.log('current user',res.data.user)

                  this.navService.setLogin(true);
                }else {
                  this.error = res.messages[0].message;
                  this.loading = false;
                }
              },
              error => {
                  this.error = error;
                  this.loading = false;
              });
  }
}