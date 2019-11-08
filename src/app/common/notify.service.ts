import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';


@Injectable()
export class NotifyService{
constructor(){}
private successResponse = new Subject<string>();
  private errorResponse = new Subject<string>();

  successResponse$ = this.successResponse.asObservable();
  errorResponse$ = this.errorResponse.asObservable();


  setSuccessResponse(mission: string) {
    this.successResponse.next(mission);
  }
  setErrorResponse(astronaut: string) {
    this.errorResponse.next(astronaut);
  }
}