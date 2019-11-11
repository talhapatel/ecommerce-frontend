import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api-service.service';
import { AuthenticationService } from '../_authService/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private _apiService:ApiService,private _authService:AuthenticationService,private router:Router) { }

  ngOnInit() {
  }
logout()
{
  this._authService.logout();
  this.router.navigate(['/login']);

}
}
