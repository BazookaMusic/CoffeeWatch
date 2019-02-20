import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  loggedIN = undefined;


  constructor(private userService: UserService) { }

  ngOnInit() {
    console.log('NAV: checking login status');
    this.loggedIN = this.userService.isloggedIN();
  }

  logout()
  {
    this.userService.logOut();
    this.loggedIN = this.userService.isloggedIN();
  }

  updateLoginStatus()
  {
    this.loggedIN = this.userService.isloggedIN();
  }

}
