import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Validators } from '@angular/forms';
import { UserService } from '../user.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  failureText: string;
  emailText: string;
  constructor(private userService: UserService,
    private location: Location) { }


  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [ Validators.email, Validators.required]),
      'password': new FormControl('', [ Validators.required])
      }
    );
    this.userService.loggedInStatus().subscribe(x => console.log(x));
  }

  ngOnDestroy() {
    if (localStorage.getItem('access_token') != null) {
      localStorage.removeItem('access_token');
    }
  }

  tryLogin() {
    const inputs = this.loginForm.controls;
    this.emailText = undefined;
    this.failureText = undefined;
    if (!inputs.email.valid) {
        this.emailText = 'Invalid e-mail address';
      } else {
      this.userService.login(inputs.email.value, inputs.password.value);
      this.userService.loggedInStatus().subscribe(value => {
          if (value === true) {
            console.log(value);
            this.location.back();
          } else {
            this.failureText = 'Wrong e-mail password combination';
          }
        });
    }



  }
}
