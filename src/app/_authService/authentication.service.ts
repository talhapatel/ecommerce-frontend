import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import {map} from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';





@Injectable({providedIn:"root"})
export class AuthenticationService{
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
    constructor(private http: HttpClient, private _router: Router, private _route: ActivatedRoute){
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();

    }
    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }
    //POST /api/auth/signin
    login(username: string, password: string) {
        return this.http.post<any>('http://localhost:8080/api/auth/signin', { username: username, password: password })
           
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('token');
        localStorage.removeItem('currentuser');
        this.currentUserSubject.next(null);
    }
}