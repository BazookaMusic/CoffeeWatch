import { Component, OnInit } from '@angular/core';

import {CoffeeShop} from '../coffee-shop'
import {Coffee} from '../coffee'
import {Review} from '../review'

@Component({
  selector: 'app-coffee-shop-list',
  templateUrl: './coffee-shop-list.component.html',
  styleUrls: ['./coffee-shop-list.component.css']
})

export class CoffeeShopListComponent implements OnInit {

  coffeeShops: CoffeeShop[] = [];
  coffeeShop: CoffeeShop;

  coffees: Coffee[] = [];
  coffee: Coffee;

  reviews: Review[];
  
  constructor() { }

  ngOnInit() 
  {
    this.coffee = new Coffee(1, "Freddo Cappuccino latte moca maciato", "../assets/cap.jpg", 2.80, 4.7, 14, this.reviews);

    this.coffees.push(this.coffee);
    this.coffees.push(this.coffee);
    this.coffees.push(this.coffee);
    this.coffees.push(this.coffee);
    this.coffees.push(this.coffee);

    this.coffeeShop = new CoffeeShop(1, "Mikel", "../assets/mikel.png", "Αγίας Βαρβάρας 13 Υμηττός(Κορυφή)", "www.mikel.gr", "1234567890", this.coffees);

    this.coffeeShops[0] = this.coffeeShop; 
    this.coffeeShops[1] = this.coffeeShop;
    this.coffeeShops[2] = this.coffeeShop;
    this.coffeeShops[3] = this.coffeeShop;
    this.coffeeShops[4] = this.coffeeShop;
  }
}
