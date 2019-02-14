import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class LoginScreenComponent implements OnInit {
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
    this.userService.loggedInStatus().subscribe(value => {
      if (value === true) {
        this.router.navigate(['/home']);
      } else if (value !== undefined) {
        console.log(value);
        if (!this.firstOpen) {
          this.failureText = 'Λάθος email ή κωδικός πρόσβασης';
        }
      }
    });
  }

  tryLogin() {
    this.firstOpen = false;
    const inputs = this.loginForm.controls;
    this.emailText = undefined;
    this.failureText = undefined;
    if (!inputs.email.valid) {
        this.emailText = 'Μη έγκυρη διεύθυνση';
      } else {
      this.userService.login(inputs.email.value, inputs.password.value);
    }



  }
}
