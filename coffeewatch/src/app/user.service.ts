import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, flatMap } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';


interface Token { access_token: string; }
export interface User {id: number; name: string; email: string; password: string; }

@Injectable({ providedIn: 'root' })
export class UserService {
  currentUsername: string = undefined;
  currentUserID: number;
  loggedIN = false;
  baseAPIURL = 'http://localhost:8765/observatory/api/';
  previousUrl = undefined;
  currentUrl = undefined;

  constructor(private http: HttpClient, private jwtHelp: JwtHelperService, router: Router) {
    router.events
        .subscribe(
            event =>
            {
              if (event instanceof NavigationEnd)
              {
                this.previousUrl = this.currentUrl;
                this.currentUrl = event.url;
              }
            }
    );
   }

  login(emailin: string, passwordin: string) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type':  'application/json' }) };

    return this.http.post<boolean>(this.baseAPIURL + 'login', {email: emailin, password: passwordin}, httpOptions).
    pipe(catchError(err =>
      {
        console.log(err);
        this.loggedIN = false;
        return of(undefined);
      }))
    .pipe(flatMap( token => {
      if(token !== undefined)
        {
          localStorage.setItem('access_token', token.access_token);
          this.loggedIN = this.isloggedIN();
          return of(this.loggedIN);
        }
      else
      {
        return of(false);
      }
      } ));

  }

  isloggedIN() {
    console.log('Checking login');
    const token = localStorage.getItem('access_token');
    if ( token !== null) {
      const decoded = this.jwtHelp.decodeToken(token);
      this.currentUsername = decoded.username;
      console.log('token valid?:' + !this.jwtHelp.isTokenExpired(token));
      this.loggedIN = !this.jwtHelp.isTokenExpired(token);
      return !this.jwtHelp.isTokenExpired(token);
    } else {
      console.log('no token');
      this.loggedIN = false;
      return false;
    }
  }

  logOut() {
    localStorage.removeItem('access_token');
    this.loggedIN = false;
  }

  registerUser(user: User) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type':  'application/json' }) };
    return this.http.post<User>(this.baseAPIURL + 'register', user, httpOptions);
  }

  getPrevUrl()
  {
    return this.previousUrl;
  }


}
