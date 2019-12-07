import { Component, OnInit, DoCheck } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { Subscription, Subject } from 'rxjs';
import { NotifyService } from './common/notify.service';
import { LoadingService } from './common/loader.service';
import { Router } from '@angular/router';
import { NavService } from './nav/nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ecommmorce';
  msgs: Message[] = [];
  subscription: Subscription;
  isLoading: Subject<Boolean>;
  constructor( private _messageService: MessageService,  private _notifyService: NotifyService,private loadingService:LoadingService,private _route:Router,private navService:NavService){
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
          this.navService.setLogin(true);
          this._route.navigate(['home']);
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
    setTimeout(() => {
      this.isLoading = this.loadingService.isLoading;
    }, 1000);
  }
}
