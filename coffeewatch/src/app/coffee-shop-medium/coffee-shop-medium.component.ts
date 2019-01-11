import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CoffeeShop } from '../coffee-shop';
import { CoffeeshopsService } from '../coffeeshops.service';

@Component({
  selector: 'app-coffee-shop-medium',
  templateUrl: './coffee-shop-medium.component.html',
  styleUrls: ['./coffee-shop-medium.component.css']
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
    this.getCoffeeShop();
  }

  getCoffeeShop(): void
  {
    const id = +this.route.snapshot.paramMap.get('coffeeShopID');

    this.coffeeShopsService.getCoffeeShop(id).subscribe(cs => this.coffeeShop = cs);
  }

  hasSelectedCoffeeShop(): boolean
  {
    return this.coffeeShopsService.getSelectedCoffeeShop != undefined;
  }

  goBack(): void {
    this.location.back();
  }
}
