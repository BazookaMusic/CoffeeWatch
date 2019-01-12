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
    this.coffeeShopsService.getSelectedCoffeeShop().subscribe(id =>
      {
        this.coffeeShopsService.getCoffeeShop(id).subscribe(cs => this.coffeeShop = cs);
      });
  }

  goBack(): void {
    this.location.back();
  }
}
