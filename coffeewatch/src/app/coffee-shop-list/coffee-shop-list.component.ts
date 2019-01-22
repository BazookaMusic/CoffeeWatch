import { Component, OnInit } from '@angular/core';

import {CoffeeShop} from '../coffee-shop'
import {Coffee} from '../coffee'
import {Review} from '../review'
import {CoffeeshopsService} from "../coffeeshops.service"
import {transition, trigger, state, animate, style} from '@angular/animations';

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
        animate(1000)
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(600, style({opacity: 0})))
    ]),
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

export class CoffeeShopListComponent implements OnInit
{
  coffeeShops:CoffeeShop[];
  reviews: Review[];
  clickedCoffeeShops: boolean[] = [];
  selectedCoffeeShop: number;
  
  constructor(private coffeeShopsService:CoffeeshopsService) { }

  ngOnInit() 
  {
    this.selectedCoffeeShop = undefined;

    this.getCoffeeShops();
    this.coffeeShopsService.getSelectedCoffeeShop().subscribe(id => this.selectedCoffeeShop = id);
  }

  getCoffeeShops()
  {
    this.coffeeShopsService.getCoffeeShops().subscribe(coffeeShopsItem => 
      {
        if (coffeeShopsItem != undefined)
        {
          this.coffeeShops = coffeeShopsItem;
          this.refresh();
        }
      });
  }

  refresh()  //run everytime list changes
  {
    this.selectedCoffeeShop = undefined;
    this.clickedCoffeeShops=[];
    let i = 0;
    for(; i < this.coffeeShops.length; i++)
    {
      this.clickedCoffeeShops[i] = false;
    }

    this.coffeeShopsService.selectCoffeeShop(undefined);
  }

  onClickCoffeeShop(coffeeShopID: number)
  {
    if (this.selectedCoffeeShop !== undefined && coffeeShopID === this.selectedCoffeeShop)
    {
        this.coffeeShopsService.selectCoffeeShop(undefined);
    }
    else
    {
      this.coffeeShopsService.selectCoffeeShop(coffeeShopID);
    }
  }
}
