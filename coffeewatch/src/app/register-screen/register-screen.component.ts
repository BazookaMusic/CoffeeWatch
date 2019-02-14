import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';

import { Validators } from '@angular/forms';
import { UserService, User } from '../user.service';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { flatMap, catchError } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-register-screen',
  templateUrl: './register-screen.component.html',
  styleUrls: ['./register-screen.component.css']
})
export class RegisterScreenComponent implements OnInit {
  registerForm: FormGroup;
  noMatch = false;
  errorText = '';

  constructor(private userService: UserService,
    private router: Router) { }






  ngOnInit() {
    this.registerForm = new FormGroup({
      'username': new FormControl('', [ Validators.required]),
      'email': new FormControl('', [ Validators.email, Validators.required]),
      'password': new FormControl('', [ Validators.required, Validators.minLength(8), Validators.maxLength(64)]),
      'confirmPassword': new FormControl('', [ Validators.required, Validators.minLength(8), Validators.maxLength(64)]),

      }
    , this.checkMatch);
  }

  checkMatch(AC: AbstractControl) {
    if (AC.get('password').value === AC.get('confirmPassword').value) {
      AC.get('password').setErrors(null);
      return null;
    } else {
      AC.get('password').setErrors({MatchPass: true});
    }
  }

  tryRegister() {
    const data = this.registerForm.controls;
    if (this.registerForm.valid) {
      const user: User = {
        name: data.username.value,
        password: data.password.value,
        email: data.email.value,
        id: undefined
         };
      this.userService.registerUser(user).pipe(catchError(err => {
          if (err.error.message === 'Email already exists')
          {
            this.errorText = 'Το email αυτό ήδη χρησιμοποιείται';
          }
          else if (err.error.message === 'User already exists')
          {
            this.errorText = 'Το όνομα χρήστη ήδη χρησιμοποιείται';
          }
          return of(undefined);
        })).subscribe(user_added => {
            if (user_added !== undefined) {
             this.router.navigate(['/login']);
            }
          });
    } else {
      this.errorText = 'Μη έγκυρη φόρμα';
    }
  }
}
