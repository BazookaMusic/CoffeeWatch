import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Validators } from '@angular/forms';
import { UserService } from '../user.service';
import {Location} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit  {
  loginForm: FormGroup;
  failureText: string;
  emailText: string;
  firstOpen: boolean;
  constructor(private userService: UserService,
    private router: Router) { }


  ngOnInit() {
    this.firstOpen = true;
    this.loginForm = new FormGroup({
      'email': new FormControl('', [ Validators.email, Validators.required]),
      'password': new FormControl('', [ Validators.required])
      }
    );

    if (this.userService.isloggedIN() === true) {
      const prev_url = this.userService.getPrevUrl();
      if (prev_url !== undefined) {
        this.router.navigateByUrl(prev_url);
      } else {
        this.router.navigate(['/home']);
      }
      }
  }

  tryLogin() {
    const inputs = this.loginForm.controls;
    this.emailText = undefined;
    this.failureText = undefined;
    if (!inputs.email.valid) {
        this.emailText = 'Μη έγκυρη διεύθυνση';
      } else {
      this.userService.login(inputs.email.value, inputs.password.value).subscribe(loggedIN => {
          if (loggedIN === true) {
            const prev_url = this.userService.getPrevUrl();
            if (prev_url !== undefined) {
              this.router.navigateByUrl(prev_url);
            } else {
              this.router.navigate(['/home']);
            }
          } else {
            this.failureText = 'Μη έγκυρο email ή κωδικός πρόσβασης';
          }
        });
    }



  }
}
