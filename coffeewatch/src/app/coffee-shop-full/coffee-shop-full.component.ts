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
  clickedCoffees: boolean[] = [];
  selectedCoffee: number;

  constructor(
    private route: ActivatedRoute,
    private coffeeShopsService: CoffeeshopsService,
    private location: Location
  ) { }

  ngOnInit()
  {
    this.getCoffeeShop();

    let i = 0;
    for(; i < this.coffeeShop.coffees.length; i++)
    {
      this.clickedCoffees[i] = false;
    }

    this.selectedCoffee = -1;
  }

  getCoffeeShop(): void 
  {
    const id = +this.route.snapshot.paramMap.get('id');

    this.coffeeShopsService.getCoffeeShop(id).subscribe( cs => this.coffeeShop = cs);
  }

  goBack(): void 
  {
    this.location.back();
  }

  onClick(coffeeIndex: number)
  {
    if(this.clickedCoffees[coffeeIndex])
    {
        this.clickedCoffees[coffeeIndex] = false;
        this.selectedCoffee = -1;
    }
    else
    {
      if (this.selectedCoffee != -1)
        this.clickedCoffees[this.selectedCoffee] = false;
        
      this.clickedCoffees[coffeeIndex] = true;
      this.selectedCoffee = coffeeIndex;
    }
    
  }
}
