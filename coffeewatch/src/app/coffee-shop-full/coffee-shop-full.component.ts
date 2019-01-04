import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CoffeeShop } from '../coffee-shop';
import { CoffeeshopsService } from '../coffeeshops.service';

@Component({
  selector: 'app-coffee-shop-full',
  templateUrl: './coffee-shop-full.component.html',
  styleUrls: ['./coffee-shop-full.component.css']
})
export class CoffeeShopFullComponent implements OnInit
{
  coffeeShop: CoffeeShop;

  constructor(
    private route: ActivatedRoute,
    private coffeeShopsService: CoffeeshopsService,
    private location: Location
  ) { }

  ngOnInit()
  {
    this.getCoffeeShop();
  }

  getCoffeeShop(): void 
  {
    const id = +this.route.snapshot.paramMap.get('id');

    this.coffeeShop = this.coffeeShopsService.getCoffeeShop(id);
  }

  goBack(): void 
  {
    this.location.back();
  }

  onClick(id: string)
  {
  
  }
}
