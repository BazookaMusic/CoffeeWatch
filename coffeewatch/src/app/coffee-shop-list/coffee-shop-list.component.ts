import { Component, OnInit } from '@angular/core';

import {CoffeeShop} from '../coffee-shop'
import {Coffee} from '../coffee'
import {Review} from '../review'
import {CoffeeshopsService} from "../coffeeshops.service"



@Component({
  selector: 'app-coffee-shop-list',
  templateUrl: './coffee-shop-list.component.html',
  styleUrls: ['./coffee-shop-list.component.css']
})

export class CoffeeShopListComponent implements OnInit {

  coffeeShops:CoffeeShop[];
  reviews: Review[];
  clickedCoffeeShops: boolean[] = [];
  selectedCoffeeShop: number;
  
  constructor(private coffeeShopsService:CoffeeshopsService) { }

  ngOnInit() 
  {
    this.getCoffeeShops();

  }

  getCoffeeShops()
  {
    this.coffeeShopsService.getCoffeeShops().subscribe(coffeeShopsItem => 
      {
      this.coffeeShops = coffeeShopsItem;
      this.refresh();
      });
  }

  refresh()  //run everytime list changes
  {
    this.selectedCoffeeShop = -1;
    this.clickedCoffeeShops=[];
    let i = 0;
    for(; i < this.coffeeShops.length; i++)
    {
      this.clickedCoffeeShops[i] = false;
    }

    this.selectedCoffeeShop = undefined;
    this.coffeeShopsService.selectCoffeeShop(undefined);

  }


  onClickCoffeeShop(coffeeShopIndex: number)
  {
    if(this.clickedCoffeeShops[coffeeShopIndex])
    {
        this.clickedCoffeeShops[coffeeShopIndex] = false;
        this.selectedCoffeeShop = undefined;
    }
    else
    {
      if (this.selectedCoffeeShop != undefined)
        this.clickedCoffeeShops[this.selectedCoffeeShop] = false;
        
      this.clickedCoffeeShops[coffeeShopIndex] = true;
      this.selectedCoffeeShop = coffeeShopIndex;
      this.coffeeShopsService.selectCoffeeShop(coffeeShopIndex);
    }
    
  }
}
