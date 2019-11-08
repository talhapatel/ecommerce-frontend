import { Component } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { Subscription, Subject } from 'rxjs';
import { NotifyService } from './common/notify.service';
import { LoadingService } from './common/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ecommmorce';
  msgs: Message[] = [];
  subscription: Subscription;
  isLoading: Subject<boolean> = this.loadingService.isLoading
constructor( private _messageService: MessageService,  private _notifyService: NotifyService,private loadingService:LoadingService){

  this.subscription = _notifyService.successResponse$.subscribe(
    msg => {
      this.messageAlert("success", msg);
    });

  this.subscription = _notifyService.errorResponse$.subscribe(
    msg => {
      this.messageAlert("error", msg);
    });

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
}
