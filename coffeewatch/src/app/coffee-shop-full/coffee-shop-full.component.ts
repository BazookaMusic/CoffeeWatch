import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CoffeeShop } from '../coffee-shop';
import { CoffeeshopsService } from '../coffeeshops.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { UserService } from '../user.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-coffee-shop-full',
  templateUrl: './coffee-shop-full.component.html',
  styleUrls: ['./coffee-shop-full.component.css'],
  animations: [
    trigger('fastFade', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({opacity: 1})),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({opacity: 0}),
        animate(600)
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(600, style({opacity: 0})))
    ]),

  ]
})

export class CoffeeShopFullComponent implements OnInit {
  coffeeShop: CoffeeShop;
  clickedCoffees: boolean[] = [];
  selectedCoffee: number;
  activeTab: string;

  constructor(
    private route: ActivatedRoute,
    private coffeeShopsService: CoffeeshopsService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.activeTab = 'description';

    this.getCoffeeShop();

    this.coffeeShopsService.priceChange$.subscribe(changed => {
      if (changed)
        {
          console.log('a');
          this.coffeeShopsService.getLastPrice(this.coffeeShop.coffees[this.selectedCoffee].id).subscribe(price => {
            if (price !== undefined) {
              console.log(price);
              this.coffeeShop.coffees[this.selectedCoffee].price = price.price;
             }
          });
      }
  });

  }

  reset() {
    let i = 0;
    for (; i < this.coffeeShop.coffees.length; i++) {
      this.clickedCoffees[i] = false;
    }

    this.selectedCoffee = undefined;
  }

  tabClicked(tab: string): void {
    this.activeTab = tab;
  }

  getCoffeeShop(): void {
    const id = +this.route.snapshot.paramMap.get('coffeeShopID');

    this.coffeeShopsService.getCoffeeShop(id).subscribe( cs => {
        this.coffeeShop = cs;
        this.reset();
      });
  }

  goBack(): void {
    this.location.back();
  }

  onClick(coffeeIndex: number) {
    if (this.clickedCoffees[coffeeIndex]) {
      this.clickedCoffees[coffeeIndex] = false;
      this.selectedCoffee = undefined;

      this.coffeeShopsService.selectCoffee(undefined);
    } else {
      if (this.selectedCoffee !== undefined) {
        this.clickedCoffees[this.selectedCoffee] = false;
      }

      this.clickedCoffees[coffeeIndex] = true;
      this.selectedCoffee = coffeeIndex;

      this.coffeeShopsService.selectCoffee(this.coffeeShop.coffees[this.selectedCoffee].id);
    }
  }
}
