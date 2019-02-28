import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit
{
  loggedIN = undefined;

  constructor(
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    console.log('NAV: checking login status');
    this.updateLoginStatus();
  }

  logout()
  {
    this.userService.logOut();
    this.updateLoginStatus();
  }

  updateLoginStatus()
  {
    this.loggedIN = this.userService.isloggedIN();
  }
}
