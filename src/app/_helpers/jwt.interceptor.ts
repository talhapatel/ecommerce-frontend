import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { AuthenticationService } from '../_authService/authentication.service';
import { Observable } from 'rxjs';
import { NotifyService } from '../common/notify.service';
import { tap, finalize, catchError, delay } from 'rxjs/operators';
import { LoadingService } from '../common/loader.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    private requests: HttpRequest<any>[] = [];
    constructor(private authenticationService: AuthenticationService,private notify:NotifyService,private loading:LoadingService) { }
    private totalRequests = 0;
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to api url
        var reqUrl = request.url;
        let url = environment.API_ENDPOINT + reqUrl
        this.totalRequests++;
    this.loading.show();
     //   this.loading.isLoading.next(true);
     //   const currentUser = this.authenticationService.currentUserValue;
        const token=localStorage.getItem("token");
        
     //   const isLoggedIn = currentUser && currentUser.token;
       
      //  const isApiUrl = request.url.startsWith(config.apiUrl);
      //  if (token) {
            console.log("token",token)
            request = request.clone({
              url: url,
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
    //    }
        return next.handle(request).pipe(
            delay(500),
            tap(resp=>{
            if (resp instanceof HttpResponse) {  
            var res = resp.body
            console.log(res.status,"interceptor")
            this.decreaseRequests();
            if (res.messages && res.messages[0]) {
                if (res.status == 'FAILURE') {
                  //  this.removeRequest(request);
                    this.notify.setErrorResponse(res.messages[0].message);
                 //   this.loading.hide()
                  //  this.loading.isLoading.next(false)
                  /*   if (this.redirectLogoutCode.indexOf('' + res.messages[0].code) > -1) {
                        this._authenticationService.logout()
                    } */
                }
                else if (res.status == 'SUCCESS') {
                    this.notify.setSuccessResponse(res.messages[0].message);
                   // this.loading.isLoading.next(false)
                //   this.loading.hide()
                   // this.removeRequest(request);
                }
            }
          /*   if(!isBackground)
                this._globalService.endRequest() */
              
              //  subscription.unsubscribe();
            }
           // this.removeRequest(request);
        
            
        }),
        
        catchError(err => {
            this.decreaseRequests();
            throw err;
          })
        ) 
    }

    private decreaseRequests() {
        this.totalRequests--;
        if (this.totalRequests === 0) {
          this.loading.hide()
        }
      }
}