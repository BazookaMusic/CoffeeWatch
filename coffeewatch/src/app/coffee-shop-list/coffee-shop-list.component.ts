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
  
  constructor(private coffeeShopsService:CoffeeshopsService) { }

  ngOnInit() 
  {
    this.coffeeShopsService.getCoffeeShops().subscribe(coffeeShopsItem=>this.coffeeShops=coffeeShopsItem);

  }
}
