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
        token => {
          let decoded = this.jwtHelp.decodeToken(token.access_token);
          this.currentUsername = decoded.username;
          console.log('username=' + this.currentUsername);
          localStorage.setItem('access_token', token.access_token);
          console.log(this.isLoggedIn());
        });
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('access_token');
    console.log(token);

    if ( token !== null) {
      return !this.jwtHelp.isTokenExpired(token);
    }
    return false;
  }


}
