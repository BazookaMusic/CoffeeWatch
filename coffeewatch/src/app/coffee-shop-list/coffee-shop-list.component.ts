import { Component, OnInit } from '@angular/core';

import {CoffeeShop} from '../coffee-shop';
import {Coffee} from '../coffee';
import {Review} from '../review';
import {CoffeeshopsService} from '../coffeeshops.service';
import {transition, trigger, state, animate, style} from '@angular/animations';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coffee-shop-list',
  templateUrl: './coffee-shop-list.component.html',
  styleUrls: ['./coffee-shop-list.component.css'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({opacity: 1})),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({opacity: 0}),
        animate(400)
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(400, style({opacity: 0})))
    ]),
    trigger('fastFade', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({opacity: 1})),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({opacity: 0}),
        animate(400)
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(400, style({opacity: 0})))
    ]),
  ]
})

export class CoffeeShopListComponent implements OnInit {
  coffeeShops: CoffeeShop[];
  filteredCoffeeShops: CoffeeShop[] = [];
  reviews: Review[];
  clickedCoffeeShops: boolean[] = [];
  selectedCoffeeShop: number;
  searchGroup: FormGroup;

  constructor(private coffeeShopsService: CoffeeshopsService,
    private router: Router) { }

  ngOnInit() {
    this.selectedCoffeeShop = undefined;
    this.searchGroup = new FormGroup({
      searchBarCoffeeShops: new FormControl('', [ Validators.minLength(0)])
    });

    this.searchGroup.controls.searchBarCoffeeShops.valueChanges.subscribe(value => {
        if (value.length === 0) {
          this.filteredCoffeeShops = this.coffeeShops;
        } else { this.filteredCoffeeShops = this.coffeeShops.filter(cs => cs.name.toLowerCase().startsWith(value.toLowerCase())); }
      });

    this.getCoffeeShops();
    this.coffeeShopsService.getSelectedCoffeeShop().subscribe(id => this.selectedCoffeeShop = id);
  }

  getCoffeeShops()
  {
    this.coffeeShopsService.getCoffeeShops().subscribe(coffeeShopsItem => {
        if (coffeeShopsItem !== undefined) {
          this.coffeeShops = coffeeShopsItem;

          if (this.filteredCoffeeShops.length === 0) {
            this.filteredCoffeeShops = this.coffeeShops.slice(0, this.coffeeShops.length);
          }
          this.refresh();
        }
      });
  }

  refresh()
  {
    this.coffeeShopsService.selectCoffeeShop(undefined);
    this.searchGroup.controls.searchBarCoffeeShops.setValue('');
  }

  onClickCoffeeShop(coffeeShopID: number) {
    if (this.selectedCoffeeShop !== undefined && coffeeShopID === this.selectedCoffeeShop) {
        this.coffeeShopsService.selectCoffeeShop(undefined);
    } else {
      this.coffeeShopsService.selectCoffeeShop(coffeeShopID);
    }
  }

  trackByFn(index: number,item: CoffeeShop): number
  {
    return item.id;
  }
}
