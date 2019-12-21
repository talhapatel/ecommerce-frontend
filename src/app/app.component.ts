import { Component, OnInit, DoCheck, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { Subscription, Subject } from 'rxjs';
import { NotifyService } from './common/notify.service';
import { LoadingService } from './common/loader.service';
import { Router } from '@angular/router';
import { NavService } from './nav/nav.service';
import { ApiService } from './api-service.service';
import { startWith, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,AfterViewInit,AfterViewChecked {
  title = 'ecommmorce';
  msgs: Message[] = [];
  subscription: Subscription;
  isLoading: Subject<boolean>;
  user:any;
  loggedType:any;
  constructor( private _messageService: MessageService,  private _notifyService: NotifyService,private loadingService:LoadingService,private _route:Router,private navService:NavService,private _apiService:ApiService){
    this.subscription = _notifyService.successResponse$.subscribe(
      msg => {
        this.messageAlert("success", msg);
      });
      
      this.subscription = _notifyService.errorResponse$.subscribe(
        msg => {
          this.messageAlert("error", msg);
        });
        
        var token=localStorage.getItem('token');
        if(token){
           this.user=this._apiService.currentUser();
          this.loggedType=this.user.user.roles[0].name;
          //this.navService.setLoginType(this.loggedType); 
          console.log("loggedType",this.loggedType)
          this.navService.setLogin(true);
          if(this.loggedType=='ROLE_USER'){
            this._route.navigate(['home']);}
            else if(this.loggedType=='ROLE_ADMIN'){
              this._route.navigate(['admin']);
            }else{
              this._route.navigate(['']);
            }
        }
        else{
          this._route.navigate(['']);
        }
        /*     this.loadingService.isLoading.subscribe((v) => {
          console.log(v);
          this.loading = v;
        }); */
        
        
      }
  public messageAlert(alertType, alertMsg): void {
    this.msgs = [];
    this._messageService.add({ severity: alertType, summary: alertMsg, detail: '', life: 5000 });
    this.msgs = [];
    // this.msgs.push({ severity: alertType, summary: alertMsg, detail: '' });
  }

  ngOnInit(){

 //this.isLoading=false;
    
 /*    setTimeout(() => {
      this.isLoading = this.loadingService.isLoading;
    }, 1000); */
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.loadingService.isLoading
            .pipe(
                startWith(null),
                tap(() =>  this.isLoading = this.loadingService.isLoading)
            ).subscribe();
    });
}

ngAfterViewChecked() {
  // viewChild is updated after the view has been checked
  if (this.isLoading === this.loadingService.isLoading) {
   
  } else {
    this.isLoading = this.loadingService.isLoading
 
  }
}
}
