import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './user.service';
import { CoffeeshopsService } from './coffeeshops.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'Coffee Watch';

  constructor(private router: Router,
    private modalService: NgbModal,
    private csS: CoffeeshopsService) { }

  ngOnInit()
  {
    this.csS.getPrices({productId: 1 , shopId: undefined});
    this.router.navigate(['/home']);

    this.router.events.subscribe(event =>
      {
        if (event instanceof NavigationEnd)
        {
          this.modalService.dismissAll();
        }
      });
  }

  ngOnDestroy()
  { 
    if (localStorage.getItem('access_token') !== null) {
      localStorage.removeItem('access_token');
    }
  }
}
