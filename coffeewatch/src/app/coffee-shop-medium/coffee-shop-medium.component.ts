import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CoffeeShop } from '../coffee-shop';
import { CoffeeshopsService } from '../coffeeshops.service';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-coffee-shop-medium',
  templateUrl: './coffee-shop-medium.component.html',
  styleUrls: ['./coffee-shop-medium.component.css'],
  animations: [
    trigger('fastFade', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({opacity: 1})),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({opacity: 0}),
        animate(100)
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(600, style({opacity: 0})))
    ]),

  ]
})
export class CoffeeShopMediumComponent implements OnInit
{
  coffeeShop: CoffeeShop;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private coffeeShopsService: CoffeeshopsService,
    private location: Location) { }

  ngOnInit()
  {
    this.coffeeShopsService.getSelectedCoffeeShop().subscribe(id =>
      {
        this.coffeeShopsService.getCoffeeShop(id).subscribe(cs => this.coffeeShop = cs);
      });
  }

  goBack(): void {
    this.location.back();
  }
}
