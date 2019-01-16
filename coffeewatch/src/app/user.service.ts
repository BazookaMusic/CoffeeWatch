import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';


interface Token{ access_token: string; }

@Injectable({ providedIn: 'root' })
export class UserService
{
  loggedIn$: BehaviorSubject<boolean>;
  currentUsername: string;
  currentUserID: number;
  baseAPIURL = 'http://localhost:8765/';
  constructor(private http: HttpClient, private jwtHelp: JwtHelperService) 
  {
    this.loggedIn$ = new BehaviorSubject<boolean>(false);
   }

  login(emailin: string, passwordin: string)
  {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type':  'application/json' }) };

    return this.http.post<Token>(this.baseAPIURL + 'login', {email: emailin, password: passwordin}, httpOptions).subscribe(
      token => {
        const decoded = this.jwtHelp.decodeToken(token.access_token);
        this.currentUsername = decoded.username;
        localStorage.setItem('access_token', token.access_token);
        this.isLoggedIn();
      }, err => this.loggedIn$.next(false));
  }

  loggedInStatus()
  {
    this.isLoggedIn();
    return this.loggedIn$;
  }

  isLoggedIn()
  {
    const token = localStorage.getItem('access_token');
    if ( token !== null)
       this.loggedIn$.next(!this.jwtHelp.isTokenExpired(token));
    else this.loggedIn$.next(false);
  }

  logOut()
  {
    localStorage.removeItem('access_token');
    this.loggedIn$.next(false);
  }
}
