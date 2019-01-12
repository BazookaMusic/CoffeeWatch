import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';



interface Token {
  access_token: string;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUsername: string;
  currentUserID: number;
  baseAPIURL = 'http://localhost:8765/';
  loggedIn = false;
  constructor(private http: HttpClient,
    private jwtHelp: JwtHelperService
    ) { }

  login(emailin: string, passwordin: string) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };


    return this.http.post<Token>(
      this.baseAPIURL + 'login', {email: emailin, password: passwordin}, httpOptions).subscribe(
        token => localStorage.setItem('token', token.access_token));
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    console.log(token);

    if ( token !== null) {
      return this.jwtHelp.isTokenExpired(token);
    }
    return false;
  }
}
